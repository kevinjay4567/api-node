import {
  sqliteTable,
  uniqueIndex,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable(
  "users",
  {
    id: integer().primaryKey({ autoIncrement: true }).notNull(),
    name: text().notNull(),
    email: text().notNull(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)]
);
