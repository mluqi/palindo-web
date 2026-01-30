const express = require("express");
const router = express.Router();
const { 
  getMenusByRole, 
  getAllRoles, 
  getAllMenus 
} = require("../controllers/roleAccessController");
const authMiddleware = require("../middlewares/authMiddleware");

// Endpoint untuk mendapatkan menu berdasarkan role (digunakan di AuthContext)
router.get("/role/:role/menus", authMiddleware, getMenusByRole);

// Endpoint master data (opsional, untuk manajemen role/menu nantinya)
router.get("/roles", authMiddleware, getAllRoles);
router.get("/menus", authMiddleware, getAllMenus);

module.exports = router;
