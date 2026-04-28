import { getAllTodos } from '../../models/todoModel';

export default defineEventHandler(async () => {
    return await getAllTodos();
});