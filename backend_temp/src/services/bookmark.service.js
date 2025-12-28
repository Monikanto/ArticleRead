import { db } from "../../db/index.js";
import { bookmarks } from "../../db/schema/bookmarks.schema.js";
import { articles } from "../../db/schema/articles.schema.js";
import { eq } from "drizzle-orm";

export const addBookmark = async (userId, articleId) => {
  await db.insert(bookmarks).values({
    userId,
    articleId,
  });

  return { message: "Bookmarked successfully" };
};

export const removeBookmark = async (userId, articleId) => {
  await db
    .delete(bookmarks)
    .where(
      eq(bookmarks.userId, userId),
      eq(bookmarks.articleId, articleId)
    );

  return { message: "Bookmark removed" };
};

export const getUserBookmarks = async (userId) => {
  const result = await db
    .select({
      id: articles.id,
      title: articles.title,
      url: articles.url,
      source: articles.source,
    })
    .from(bookmarks)
    .innerJoin(articles, eq(bookmarks.articleId, articles.id))
    .where(eq(bookmarks.userId, userId));

  return result;
};
