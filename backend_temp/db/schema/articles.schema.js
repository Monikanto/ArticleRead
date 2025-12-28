import{
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
}from 'drizzle-orm/pg-core';

export const articles =pgTable("article", {
    id : serial("id").primaryKey(),

    title : varchar("title", {length :500}).notNull(),

    summary : text("summary"),

    url:varchar("url",{length : 1000})
    .notNull()
    .unique(),

    ImageURL: varchar("imageUrl",{length :1000}),

    source : varchar("source", {length :255}).notNull(),

    publishedAt : timestamp("published_at"),

    createdAt : timestamp('created_at').defaultNow(),
})