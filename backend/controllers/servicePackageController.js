const { ServicePackage } = require("../models");
const path = require("path");
const fs = require("fs");

// Helper: Hapus file gambar
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.createServicePackage = async (req, res) => {
  try {
    const {
      category,
      title,
      speed,
      price,
      original_price,
      discount,
      discount_note,
      is_highlighted,
      display_order,
    } = req.body;
    const image = req.file ? req.file.filename : null;

    // Parse JSON strings dari FormData (untuk multi-bahasa)
    const titleData = typeof title === "string" ? JSON.parse(title) : title;
    const discountData =
      typeof discount === "string" ? JSON.parse(discount) : discount;
    const discountNoteData =
      typeof discount_note === "string"
        ? JSON.parse(discount_note)
        : discount_note;

    const newPackage = await ServicePackage.create({
      category,
      title: titleData,
      speed,
      price,
      original_price: original_price || null,
      discount: discountData,
      discount_note: discountNoteData,
      image,
      is_highlighted: is_highlighted === "true" || is_highlighted === true,
      display_order: display_order || 0,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllServicePackages = async (req, res) => {
  try {
    const { category } = req.query;
    const whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    const packages = await ServicePackage.findAll({
      where: whereClause,
      order: [
        ["display_order", "ASC"],
        ["createdAt", "DESC"],
      ],
    });
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getServicePackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicePackage = await ServicePackage.findByPk(id);

    if (!servicePackage) {
      return res.status(404).json({ message: "Service Package not found" });
    }

    res.status(200).json(servicePackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateServicePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      title,
      speed,
      price,
      original_price,
      discount,
      discount_note,
      is_highlighted,
      display_order,
    } = req.body;

    const servicePackage = await ServicePackage.findByPk(id);
    if (!servicePackage) {
      return res.status(404).json({ message: "Service Package not found" });
    }

    // Handle Image Update
    if (req.file) {
      // Hapus gambar lama jika ada dan bukan URL eksternal
      if (servicePackage.image && !servicePackage.image.startsWith("http")) {
        deleteImageFile(
          path.join(__dirname, "..", "uploads", servicePackage.image),
        );
      }
      servicePackage.image = req.file.filename;
    }

    if (category) servicePackage.category = category;
    if (title)
      servicePackage.title =
        typeof title === "string" ? JSON.parse(title) : title;
    if (speed) servicePackage.speed = speed;
    if (price) servicePackage.price = price;
    if (original_price !== undefined)
      servicePackage.original_price = original_price || null;
    if (discount !== undefined)
      servicePackage.discount =
        typeof discount === "string" ? JSON.parse(discount) : discount;
    if (discount_note !== undefined)
      servicePackage.discount_note =
        typeof discount_note === "string"
          ? JSON.parse(discount_note)
          : discount_note;
    if (is_highlighted !== undefined)
      servicePackage.is_highlighted =
        is_highlighted === "true" || is_highlighted === true;
    if (display_order !== undefined)
      servicePackage.display_order = display_order;

    await servicePackage.save();
    res.status(200).json(servicePackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteServicePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const servicePackage = await ServicePackage.findByPk(id);

    if (!servicePackage) {
      return res.status(404).json({ message: "Service Package not found" });
    }

    if (servicePackage.image && !servicePackage.image.startsWith("http")) {
      deleteImageFile(
        path.join(__dirname, "..", "uploads", servicePackage.image),
      );
    }

    await servicePackage.destroy();
    res.status(200).json({ message: "Service Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
