import { db } from '../utils/db';
import { todos } from '../db/schema';
import { eq } from "drizzle-orm";

export const createTodo = async (data: any) => {
    return db.insert(todos).values(data);
}

export const getAllTodos = async () => {
    return db.select().from(todos).all();
}

export const softDeleteTodo = async () => {
    return db.update(todos).set({ isSoftDelete: true });
}

export const updateTodo = async (id: string, completed: boolean) => {
    return db.update(todos).set({ completed }).where(eq(todos.id, id));
}

export const deleteTodo = async (id: string) => {
    return db.delete(todos).where(eq(todos.id, id));
}