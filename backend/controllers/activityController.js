const { Activity } = require("../models");
const path = require("path");
const fs = require("fs");

// Helper: Hapus file gambar
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.createActivity = async (req, res) => {
  try {
    const { title, description, category, location, date } = req.body;
    const image = req.file ? req.file.filename : null;

    // Parse JSON strings dari FormData (untuk multi-bahasa)
    const titleData = typeof title === "string" ? JSON.parse(title) : title;
    const descriptionData =
      typeof description === "string" ? JSON.parse(description) : description;

    const newActivity = await Activity.create({
      title: titleData,
      description: descriptionData,
      image,
      category,
      location,
      date,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const { category } = req.query;
    const whereClause = {};

    if (category && category !== "Semua") {
      whereClause.category = category;
    }

    const activities = await Activity.findAll({
      where: whereClause,
      order: [["date", "DESC"]],
    });
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, location, date } = req.body;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Handle Image Update
    if (req.file) {
      if (activity.image && !activity.image.startsWith("http")) {
        deleteImageFile(path.join(__dirname, "..", "uploads", activity.image));
      }
      activity.image = req.file.filename;
    }

    if (title)
      activity.title = typeof title === "string" ? JSON.parse(title) : title;
    if (description)
      activity.description =
        typeof description === "string" ? JSON.parse(description) : description;
    if (category) activity.category = category;
    if (location) activity.location = location;
    if (date) activity.date = date;

    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.image && !activity.image.startsWith("http")) {
      deleteImageFile(path.join(__dirname, "..", "uploads", activity.image));
    }

    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
