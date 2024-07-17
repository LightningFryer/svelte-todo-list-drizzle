
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { db } from "./drizzle";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull(),
	password_hash: text("password_hash"),
	picture: text("picture"),
	email: text("email").notNull(),
    account_type: text("account_type").notNull(),
	oauth_account_id: text("oauth_account_id"),
});

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
});

export const oauth_account_table = sqliteTable("oauth_account", {
	provider_id: text("provider_id").notNull(),
    provider_user_id: text("provider_user_id").notNull().primaryKey(),
    userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
});

export const todo_table = sqliteTable("todo", {
	id: text("id").notNull().primaryKey(),
    userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
    title: text("title").notNull(),
    description: text("description").notNull(),
});