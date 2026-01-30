const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  changePassword,
  adminChangePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createUser);
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/change-password", authMiddleware, changePassword);
router.put("/reset-password/:id", authMiddleware, adminChangePassword);

module.exports = router;