import axios from "axios";
import { db } from "../../db/index.js";
import { articles } from "../../db/schema/articles.schema.js";

export const fetchAndStoreArticles = async () => {
  const response = await axios.get(
    "https://newsapi.org/v2/top-headlines",
    {
      params: {
        country: "us",
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY,
      },
    }
  );

  const fetchedArticles = response.data.articles;

  const values = fetchedArticles
    .filter(a => a.url && a.title)
    .map(a => ({
      title: a.title,
      summary: a.description,
      url: a.url,
      imageUrl: a.urlToImage,
      source: a.source.name,
      publishedAt: a.publishedAt
        ? new Date(a.publishedAt)
        : null,
    }));

  if (values.length === 0) return 0;

  await db
    .insert(articles)
    .values(values)
    .onConflictDoNothing(); // 🔥 prevents duplicates

  return values.length;
};
