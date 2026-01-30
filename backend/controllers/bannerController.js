const { herobanner } = require("../models");
const path = require("path");
const fs = require("fs");

//function delete image file
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};


exports.addHeroBanner = async (req, res) => {
  const { is_active, display_order } = req.body;

  try {
    const desktop_image = req.files['desktop_image'] ? req.files['desktop_image'][0].filename : null;
    const mobile_image = req.files['mobile_image'] ? req.files['mobile_image'][0].filename : null;

    const newBanner = await herobanner.create({
      desktop_image,
      mobile_image,
      is_active: is_active === 'true' || is_active === true,
      display_order,
    });
    res.status(201).json(newBanner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllHeroBanners = async (req, res) => {
  try {
    const banners = await herobanner.findAll({
      order: [['display_order', 'ASC']]
    });
    res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateHeroBanner = async (req, res) => {
  const { id } = req.params;
  const { is_active, display_order } = req.body;

  try {
    const banner = await herobanner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Hero banner not found" });
    }

    if (req.files['desktop_image']) {
      deleteImageFile(path.join(__dirname, "..", "uploads", banner.desktop_image));
      banner.desktop_image = req.files['desktop_image'][0].filename;
    }

    if (req.files['mobile_image']) {
      deleteImageFile(path.join(__dirname, "..", "uploads", banner.mobile_image));
      banner.mobile_image = req.files['mobile_image'][0].filename;
    }

    if (is_active !== undefined) {
        banner.is_active = is_active === 'true' || is_active === true;
    }
    if (display_order !== undefined) banner.display_order = display_order;

    await banner.save();
    res.status(200).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteHeroBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await herobanner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Hero banner not found" });
    }

    deleteImageFile(path.join(__dirname, "..", "uploads", banner.desktop_image));
    deleteImageFile(path.join(__dirname, "..", "uploads", banner.mobile_image));

    await banner.destroy();
    res.status(200).json({ message: "Hero banner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
