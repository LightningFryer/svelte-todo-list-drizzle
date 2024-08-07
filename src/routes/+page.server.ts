import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { db }  from "../db/drizzle";
import { todo_table } from '../db/schema';
import { eq } from 'drizzle-orm';

export const load = (async (event) => {
    const user = event.locals.user
	const userId = user?.id as string;
    const session = event.locals.session;
	if (session) {
		const todos = await db.query.todo_table.findMany({
			where: eq(todo_table.userId, userId)
		})

		return {
			user, session, todos
		};
	}
	return {
		user, session 
	}
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
		redirect(302, "/");
    },

	deleteTodo: async (event) => {
		const formData = await event.request.formData();
		const todoId = formData.get("todoId") as string;
		await db.delete(todo_table).where(eq(todo_table.id, todoId));
		return redirect(302, "/");
	}
};