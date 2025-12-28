import{
    pgTable,
    serial,
    integer,
    timestamp,
    unique,
}from "drizzle-orm/pg-core";
import{users} from "./users.schema.js";
import { articles } from "./articles.schema.js";

export const bookmarks = pgTable("bookmarks",{
    id:serial('id').primaryKey(),

    userId :integer("user_id")
    .notNull()
    .references(()=> users.id,{onDelete : "cascade"}),

    articleId:integer("article_id")
    .notNull()
    .references(()=> articles.id,{onDelete : 'cascade'}),

    createdAt:timestamp("created_at").defaultNow(),
},

    (table)=>({
        uniqueBookmark :unique().on(
            table.userId,
            table.articleId
        ),
    })


);