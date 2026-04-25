import { db } from '../../utils/db';
import { todos } from '../../db/schema';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const newToDo = {
        id: crypto.randomUUID(),
        name: body.name,
        completed: false,
        isSoftDelete: false,
        dataCreated: new Date()
    };

    await db.insert(todos).values(newToDo);

    return newToDo;
});