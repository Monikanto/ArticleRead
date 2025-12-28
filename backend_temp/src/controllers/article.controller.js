import { fetchAndStoreArticles } from "../services/article.service.js";

export const fetchArticles = async (req, res) => {
  try {
    const count = await fetchAndStoreArticles();
    res.json({ message: "Articles fetched", count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
