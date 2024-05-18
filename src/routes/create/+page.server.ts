import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { newTodoSchema } from '../../zodSchema';
import { db } from "../../db"
import { todoLists } from '../../schema';

export const load = (async (event) => {
    const session = await event.locals.auth();
    if (!session){
        redirect(301, "/");
    }
    else{
        // const todoForm = await superValidate(zod(newTodoSchema));
        return {session};
    }
    
}) satisfies PageServerLoad;

export const actions: Actions = {
    createTodo: async (event) => {
        const formData = await event.request.formData();
        const session = await event.locals.auth();
        const userId = session?.user?.id;
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        const data = {
            title: title,
            content: content,
            userId: userId,
        }

        if (!title || !content){
            console.log("Fields were blank")
            redirect(301, "/");
        }
        else{
            await db.insert(todoLists).values(data);
            console.log("Successfully inserted a row");
            redirect(301, "/");
        }
        
    }
}