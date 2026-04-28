import { handleSoftDeleteTodo } from "../../controllers/todoController";

export default defineEventHandler(async () => {
    return await handleSoftDeleteTodo();
});