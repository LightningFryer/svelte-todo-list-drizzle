import { db } from '../db';
import { eq } from 'drizzle-orm';
import { todoLists } from '../schema';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load = (async (event) => {
    const session = await event.locals.auth();
    const currentUserId = session?.user?.id as string;
    
    if (!session){
        return {}
    }
    else{
        const todos = await db.select().from(todoLists).where(eq(todoLists.userId, currentUserId));
        // console.log(todos);
        return {todos};
    }
}) satisfies PageServerLoad;

export const actions = {
    deleteTodo: async (event) => {
        const formData = await event.request.formData();
        const todoId = formData.get("todoId") as string;
        await db.delete(todoLists).where(eq(todoLists.id, todoId));
        console.log("Todo successfully deleted!");
    }
} satisfies Actions