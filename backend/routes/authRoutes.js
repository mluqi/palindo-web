const express = require("express");
const router = express.Router();
const {
  signin,
  signout,
  getUserProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signin", signin);
router.post("/signout", authMiddleware, signout);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
