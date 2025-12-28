import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import articleRoutes from "./routes/article.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";





const app = express();

app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/articles", articleRoutes);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/auth/register", (req, res) => {
  res.send("Use POST, not GET ");
});

app.get("/health", (req ,res ) =>{
    res.json({status : "OK"});
});

export default app;