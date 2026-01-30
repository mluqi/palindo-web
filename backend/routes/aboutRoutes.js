const express = require("express");
const router = express.Router();
const {
  getAboutContents,
  getAboutContentById,
  updateAboutContent,
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/aboutController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");

// Konfigurasi upload untuk About Content (bisa single image atau multiple additional_images)
const aboutContentUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "additional_images", maxCount: 10 },
]);

// --- About Content Routes ---
router.get("/content", getAboutContents);
router.get("/content/:id", getAboutContentById);
// Hanya update yang diperlukan karena konten section biasanya statis (dibuat via seeder)
router.put(
  "/content/:id",
  authMiddleware,
  aboutContentUpload,
  updateAboutContent,
);

// --- Team Member Routes ---
router.get("/team", getAllTeamMembers);
router.post("/team", authMiddleware, upload.single("image"), createTeamMember);
router.put(
  "/team/:id",
  authMiddleware,
  upload.single("image"),
  updateTeamMember,
);
router.delete("/team/:id", authMiddleware, deleteTeamMember);

module.exports = router;
