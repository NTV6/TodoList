import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text().notNull(),
    isSoftDelete: integer({ mode: 'boolean' }).notNull().$defaultFn(() => false),
    completed: integer({ mode: 'boolean' }).notNull().$defaultFn(() => false),
    dataCreated: integer({ mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})    