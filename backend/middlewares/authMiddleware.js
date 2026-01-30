require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, roles } = require("../models");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret",
    );

    const user_data = await User.findByPk(verified.id);

    if (!user_data) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user_data.user_token !== token) {
      return res.status(401).json({ message: "Token revoked!" });
    }

    const role_name = await roles.findOne({
      where: { role_id: user_data.user_role },
    });

    req.user = {
      id: user_data.id,
      name: user_data.user_name,
      role: role_name ? role_name.role_name : null,
    };

    console.log(req.user);

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
