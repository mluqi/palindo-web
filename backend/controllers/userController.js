const { User, roles } = require("../models");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { user_name, user_email, user_password, user_role } = req.body;

  const userRole = req.user.role;
  if (userRole !== "superadmin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (!user_name || !user_email || !user_password || !user_role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ where: { user_email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_role,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["user_password", "user_token"] },
      include: [
        {
          model: roles,
          attributes: ["role_id", "role_name"],
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { user_name, user_email, user_role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.user_name = user_name || user.user_name;
    user.user_email = user_email || user.user_email;
    user.user_role = user_role || user.user_role;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  const userRole = req.user.role;

  if (userRole !== "superadmin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    return res
      .status(400)
      .json({ message: "Old and new passwords are required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOldPasswordValid = await bcrypt.compare(
      old_password,
      user.user_password,
    );
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    user.user_password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//changepassword by superadmin
exports.adminChangePassword = async (req, res) => {
  const { new_password } = req.body;

  const userId = req.params.id;
  const userRole = req.user.role;

  if (userRole !== "superadmin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (!new_password) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    user.user_password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
