import { db } from "../../utils/db";
import { todos } from "../../db/schema";

export default defineEventHandler(async () => {
    await db.update(todos).set({ isSoftDelete: true })

    return {
        success: true,
    };
});