import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
    url: "file:./server/db/db.sqlite",
});

export const db = drizzle(client);