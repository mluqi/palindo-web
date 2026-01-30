const express = require("express");
const router = express.Router();
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");

// Public Routes
router.get("/", getAllActivities);
router.get("/:id", getActivityById);

// Protected Routes (Admin)
router.post("/", authMiddleware, upload.single("image"), createActivity);
router.put("/:id", authMiddleware, upload.single("image"), updateActivity);
router.delete("/:id", authMiddleware, deleteActivity);

module.exports = router;
