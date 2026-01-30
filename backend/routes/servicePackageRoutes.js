const express = require("express");
const router = express.Router();
const {
  createServicePackage,
  getAllServicePackages,
  getServicePackageById,
  updateServicePackage,
  deleteServicePackage,
} = require("../controllers/servicePackageController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");

// Public Routes
router.get("/", getAllServicePackages);
router.get("/:id", getServicePackageById);

// Protected Routes (Admin)
router.post("/", authMiddleware, upload.single("image"), createServicePackage);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateServicePackage,
);
router.delete("/:id", authMiddleware, deleteServicePackage);

module.exports = router;
