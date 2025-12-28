import {
    pgTable,
    serial ,
    varchar ,
    timestamp,
}from "drizzle-orm/pg-core";

export const users =pgTable("user", {
    id :serial("id").primaryKey(),

    name:varchar('name', {length : 100}),

    email:varchar("email", {length : 255})
    .notNull()
    .unique(),

    password : varchar("password", {length : 255}).notNull(),

    createdAt :timestamp("created_at").defaultNow(),
    updatedAt : timestamp("updated_at").defaultNow(),
});