const express = require("express");
const router = express.Router();
const {
  createArticle,
  getAllArticles,
  getPublishedArticles,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
} = require("../controllers/articleController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");

// Public Routes
router.get("/", getAllArticles);
router.get("/published", getPublishedArticles);
router.get("/:slug", getArticleBySlug);

// Protected Routes (Admin)
// Endpoint khusus untuk upload gambar dari dalam editor (Quill)
router.post("/upload-image", authMiddleware, upload.single("image"), uploadArticleImage);

router.post("/", authMiddleware, upload.single("image"), createArticle);
router.put("/:id", authMiddleware, upload.single("image"), updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;
