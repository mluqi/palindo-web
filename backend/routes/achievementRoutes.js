const express = require("express");
const router = express.Router();
const {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public Routes
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);

// Protected Routes (Admin)
router.post("/", authMiddleware, createAchievement);
router.put("/:id", authMiddleware, updateAchievement);
router.delete("/:id", authMiddleware, deleteAchievement);

module.exports = router;
