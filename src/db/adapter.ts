// yes the adapter needs to be initialized before the db is initialized I have no idea why this fucking piece of shit is necessary
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./drizzle";
import { sessionTable, userTable } from "./schema";

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);