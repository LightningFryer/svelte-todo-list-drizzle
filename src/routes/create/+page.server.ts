import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from "../../db/drizzle"
import { todo_table } from '../../db/schema';
import { generateIdFromEntropySize } from 'lucia';

export const load = (async (event) => {
    const user = await event.locals.user;
    const session = await event.locals.session;

    if (!session){
        redirect(301, "/");
    }
    else{
        // const todoForm = await superValidate(zod(newTodoSchema));
        return { user, session };
    }
    
}) satisfies PageServerLoad;

export const actions: Actions = {
    createTodo: async (event) => {
        const formData = await event.request.formData();
        const userId = event.locals.user?.id;
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        const data = {
            id: generateIdFromEntropySize(10),
            userId: userId,
            title: title,
            description: content,
        }

        if (!title || !content){
            console.log("Fields were blank")
            redirect(301, "/");
        }
        else{
            await db.insert(todo_table).values(data);
            console.log("Successfully inserted a row");
            redirect(301, "/");
        }
        
    }
}