import { createTodo, getAllTodos, softDeleteTodo, updateTodo, deleteTodo } from '../models/todoModel';

export const handleCreateTodo = async (body: any) => {
    const newToDo = {
        id: crypto.randomUUID(),
        name: body.name,
        completed: false,
        isSoftDelete: false,
        dataCreated: new Date()
    };

    await createTodo(newToDo);
    return newToDo;
};

export const handleDeleteTodo = async (event: any) => {
    const id = event.context.params?.id;
    await deleteTodo(id);

    return { success: true };
};

export const handleGetAllTodos = async () => {
    return await getAllTodos();
};

export const handleSoftDeleteTodo = async () => {
    await softDeleteTodo();
    return { success: true };
};

export const handleUpdateTodo = async (event: any) => {
    const id = event.context.params?.id;
    const body = await readBody(event);
    await updateTodo(id, body);
    return { success: true };
};