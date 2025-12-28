import { Router } from "express";
import { fetchArticles } from "../controllers/article.controller.js";

const router = Router();

// manual trigger (later cron will call same service)
router.post("/fetch", fetchArticles);

export default router;
