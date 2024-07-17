import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { google, lucia } from "$lib/server/auth";
import { db } from "../../../../db/drizzle";

import type { RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { oauth_account_table, userTable } from "../../../../db/schema";

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
    const codeVerifier = event.cookies.get("google_oauth_code_verifier") as string;
	const storedState = event.cookies.get("google_oauth_state") ?? null;

	if (!code || !state || !storedState || state !== storedState) {
        console.log("Invalid state");
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await googleUserResponse.json();
        console.log(googleUser);

		// Replace this with your own DB client.
        const existingUser = await db.query.oauth_account_table.findFirst({
            where: eq(oauth_account_table.provider_user_id, googleUser.sub)
        });

		if (existingUser) {
			const session = await lucia.createSession(existingUser.userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		} else {
			const userId = generateIdFromEntropySize(10); // 16 characters long

            await db.insert(userTable).values({
				id: userId,
				username: googleUser.name,
				picture: googleUser.picture,
				email: googleUser.email,
				account_type: "google",
				oauth_account_id: googleUser.sub,
			});

			await db.insert(oauth_account_table).values({
				provider_id: "google",
				provider_user_id: googleUser.sub,
				userId: userId,
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GoogleUser {
	sub: string; 
	name: string;
    picture: string;
    email: string;
}