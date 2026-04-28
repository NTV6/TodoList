import { handleUpdateTodo } from "../../controllers/todoController";

export default defineEventHandler(async (event) => {
    return await handleUpdateTodo(event);
});