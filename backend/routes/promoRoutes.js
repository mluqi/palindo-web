const express = require("express");
const router = express.Router();
const {
  createPromo,
  getAllPromos,
  getPromoById,
  updatePromo,
  deletePromo,
} = require("../controllers/promoController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");

// Public Routes
router.get("/", getAllPromos);
router.get("/:id", getPromoById);

// Protected Routes (Admin)
router.post("/", authMiddleware, upload.single("image"), createPromo);
router.put("/:id", authMiddleware, upload.single("image"), updatePromo);
router.delete("/:id", authMiddleware, deletePromo);

module.exports = router;
