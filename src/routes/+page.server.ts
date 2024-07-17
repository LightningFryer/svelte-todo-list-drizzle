import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";

export const load = (async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;
    return {
        user, session
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    logout: async (event) => {
        if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
    }
};