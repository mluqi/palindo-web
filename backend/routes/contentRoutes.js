const express = require("express");
const router = express.Router();
const {
  addHeroBanner,
  getAllHeroBanners,
  updateHeroBanner,
  deleteHeroBanner,
} = require("../controllers/bannerController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");

const bannerUpload = upload.fields([
  { name: "desktop_image", maxCount: 1 },
  { name: "mobile_image", maxCount: 1 },
]);

// Hero Banner Routes
router.get("/banners", getAllHeroBanners);
router.post("/banners", authMiddleware, bannerUpload, addHeroBanner);
router.put("/banners/:id", authMiddleware, bannerUpload, updateHeroBanner);
router.delete("/banners/:id", authMiddleware, deleteHeroBanner);

module.exports = router;
