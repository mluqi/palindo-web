const { Promo } = require("../models");
const path = require("path");
const fs = require("fs");

// Helper: Hapus file gambar
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.createPromo = async (req, res) => {
  try {
    const { title, description, discount, valid_until, is_active } = req.body;
    const image = req.file ? req.file.filename : null;

    // Parse JSON strings dari FormData (untuk multi-bahasa)
    const titleData = typeof title === "string" ? JSON.parse(title) : title;
    const descriptionData =
      typeof description === "string" ? JSON.parse(description) : description;

    const newPromo = await Promo.create({
      title: titleData,
      description: descriptionData,
      image,
      discount,
      valid_until,
      is_active: is_active === "true" || is_active === true,
    });

    res.status(201).json(newPromo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPromos = async (req, res) => {
  try {
    const { active_only } = req.query;
    const whereClause = {};

    if (active_only === "true") {
      whereClause.is_active = true;
    }

    const promos = await Promo.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(promos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPromoById = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await Promo.findByPk(id);

    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.status(200).json(promo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, discount, valid_until, is_active } = req.body;

    const promo = await Promo.findByPk(id);
    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    // Handle Image Update
    if (req.file) {
      // Hapus gambar lama jika ada
      if (promo.image) {
        deleteImageFile(path.join(__dirname, "..", "uploads", promo.image));
      }
      promo.image = req.file.filename;
    }

    // Update fields (Parse JSON jika string)
    if (title)
      promo.title = typeof title === "string" ? JSON.parse(title) : title;
    if (description)
      promo.description =
        typeof description === "string" ? JSON.parse(description) : description;
    if (discount) promo.discount = discount;
    if (valid_until) promo.valid_until = valid_until;
    if (is_active !== undefined)
      promo.is_active = is_active === "true" || is_active === true;

    await promo.save();
    res.status(200).json(promo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await Promo.findByPk(id);

    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    // Hapus gambar saat promo dihapus
    if (promo.image) {
      deleteImageFile(path.join(__dirname, "..", "uploads", promo.image));
    }

    await promo.destroy();
    res.status(200).json({ message: "Promo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
