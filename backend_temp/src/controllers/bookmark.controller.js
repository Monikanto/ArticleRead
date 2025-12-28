import {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
} from "../services/bookmark.service.js";

export const bookmarkArticle = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    const result = await addBookmark(userId, articleId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const unbookmarkArticle = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    const result = await removeBookmark(userId, articleId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await getUserBookmarks(userId);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
