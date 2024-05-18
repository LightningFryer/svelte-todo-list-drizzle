import { db } from '../db';
import { eq } from 'drizzle-orm';
import { todoLists } from '../schema';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const session = await event.locals.auth();
    const currentUserId = session?.user?.id as string;
    
    if (!session){
        return {}
    }
    else{
        const todos = await db.select().from(todoLists).where(eq(todoLists.userId, currentUserId));
        console.log(todos);
        return {todos};
    }
}) satisfies PageServerLoad;