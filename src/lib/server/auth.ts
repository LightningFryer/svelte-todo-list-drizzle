import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { adapter } from "../../db/adapter";
import { Google } from "arctic";
import { config } from "dotenv";

config({ path: '.env' });

export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URI!);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			id: attributes.id,
			username: attributes.username,
			picture: attributes.picture,
			account_type: attributes.account_type,
			email: attributes.email,
			ouauth_account_id: attributes.oauth_account_id,
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	username: string;
	picture: string;
	account_type: string;
	email: string;
	oauth_account_id: string | undefined | null;
}