import { handleCreateTodo } from '../../controllers/todoController';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return await handleCreateTodo(body);
});