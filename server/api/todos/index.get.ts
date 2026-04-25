import { db } from '../../utils/db';
import { todos } from '../../db/schema';

export default defineEventHandler(async () => {
    const todosList = await db.select().from(todos);
    return todosList
});