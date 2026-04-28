import { handleDeleteTodo } from "../../controllers/todoController";

export default defineEventHandler(async (event) => {
    return await handleDeleteTodo(event);
});