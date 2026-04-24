import { db } from "../../utils/db";
import { todos } from "../../db/schema";

export default defineEventHandler(async () => {
    await db.delete(todos);

    return {
        success: true,
    };
});