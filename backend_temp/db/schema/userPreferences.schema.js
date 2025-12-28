import{
    pgTable,
    serial,
    integer,
    timestamp,
    unique,
}from "drizzle-orm/pg-core";
import{users}from "./users.schema.js";
import {categories } from "./categories.schema.js";

export const userPreference = pgTable("userPreference",{
    id:serial('id').primaryKey(),

    userId:integer("user_id")
    .notNull()
    .references(()=> users.id,{onDelete : 'cascade'}),

   categoryId :integer("category_id")
   .notNull()
   .references(()=>categories.id, {onDelete : "cascade"}),

    createdAt:timestamp("created_at").defaultNow(),
},
(table)=>({
    uniqueUserCategory: unique().on(
        table.userId,
        table.categoryId
    ),
})


);