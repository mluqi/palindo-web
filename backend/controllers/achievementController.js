const { Achievement } = require("../models");

exports.createAchievement = async (req, res) => {
  try {
    const { year, title, description, issuer, icon } = req.body;

    // Parse JSON strings jika dikirim sebagai string (misal dari FormData)
    // atau gunakan langsung jika sudah berupa object (dari JSON body)
    const titleData = typeof title === "string" ? JSON.parse(title) : title;
    const descriptionData =
      typeof description === "string" ? JSON.parse(description) : description;
    const issuerData = typeof issuer === "string" ? JSON.parse(issuer) : issuer;

    const newAchievement = await Achievement.create({
      year,
      title: titleData,
      description: descriptionData,
      issuer: issuerData,
      icon,
    });

    res.status(201).json(newAchievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      order: [["year", "DESC"]],
    });
    res.status(200).json(achievements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json(achievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, description, issuer, icon } = req.body;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    if (year) achievement.year = year;
    if (title)
      achievement.title = typeof title === "string" ? JSON.parse(title) : title;
    if (description)
      achievement.description =
        typeof description === "string" ? JSON.parse(description) : description;
    if (issuer)
      achievement.issuer =
        typeof issuer === "string" ? JSON.parse(issuer) : issuer;
    if (icon) achievement.icon = icon;

    await achievement.save();
    res.status(200).json(achievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    await achievement.destroy();
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
