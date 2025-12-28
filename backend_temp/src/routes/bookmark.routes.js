import { Router } from "express";
import {
  bookmarkArticle,
  unbookmarkArticle,
  getBookmarks,
} from "../controllers/bookmark.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, bookmarkArticle);
router.delete("/", authMiddleware, unbookmarkArticle);
router.get("/", authMiddleware, getBookmarks);

export default router;
