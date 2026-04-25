import { db } from "../../utils/db";
import { todos } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const body = await readBody(event);

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Missing id param" });
    }
    await db.update(todos).set({ completed: body.completed }).where(eq(todos.id, id));

    return { success: true };
});