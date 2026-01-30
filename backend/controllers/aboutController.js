const { AboutContent, TeamMember } = require("../models");
const path = require("path");
const fs = require("fs");

// Helper: Hapus file gambar
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// ==========================================
// ABOUT CONTENT CONTROLLER
// ==========================================

exports.getAboutContents = async (req, res) => {
  try {
    const contents = await AboutContent.findAll();
    res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAboutContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await AboutContent.findByPk(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, items, kept_images } = req.body;

    const content = await AboutContent.findByPk(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // 1. Handle Main Image
    if (req.files && req.files["image"]) {
      if (content.image && !content.image.startsWith("http")) {
        deleteImageFile(path.join(__dirname, "..", "uploads", content.image));
      }
      content.image = req.files["image"][0].filename;
    }

    // 2. Handle Additional Images (Gallery)
    // Logic: Ambil gambar lama yang dipertahankan (kept_images) + gambar baru yang diupload
    let currentAdditionalImages = content.additional_images || [];
    let newAdditionalImages = [];

    // Proses gambar baru
    if (req.files && req.files["additional_images"]) {
      newAdditionalImages = req.files["additional_images"].map(
        (file) => file.filename,
      );
    }

    // Proses gambar yang dipertahankan (dari frontend dikirim sebagai JSON string array filename)
    let keptImagesArray = [];
    if (kept_images) {
      try {
        keptImagesArray = JSON.parse(kept_images);
      } catch (e) {
        keptImagesArray = [];
      }
    } else {
      // Jika tidak ada kept_images yang dikirim, asumsikan kita mempertahankan semua yang lama
      // KECUALI jika ini adalah request multipart yang memang berniat menghapus.
      // Untuk keamanan, jika kept_images undefined, kita pakai currentAdditionalImages.
      keptImagesArray = currentAdditionalImages;
    }

    // Hapus gambar fisik yang tidak ada di keptImagesArray
    currentAdditionalImages.forEach((img) => {
      if (!keptImagesArray.includes(img) && !img.startsWith("http")) {
        deleteImageFile(path.join(__dirname, "..", "uploads", img));
      }
    });

    // Gabungkan
    content.additional_images = [...keptImagesArray, ...newAdditionalImages];

    // 3. Update Text Fields
    if (title)
      content.title = typeof title === "string" ? JSON.parse(title) : title;
    if (description)
      content.description =
        typeof description === "string" ? JSON.parse(description) : description;
    if (items)
      content.items = typeof items === "string" ? JSON.parse(items) : items;

    await content.save();
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ==========================================
// TEAM MEMBER CONTROLLER
// ==========================================

exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.findAll({
      order: [
        ["display_order", "ASC"],
        ["createdAt", "DESC"],
      ],
    });
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const { name, position, bio, display_order } = req.body;
    const image = req.file ? req.file.filename : null;

    const positionData =
      typeof position === "string" ? JSON.parse(position) : position;
    const bioData = typeof bio === "string" ? JSON.parse(bio) : bio;

    const newMember = await TeamMember.create({
      name,
      position: positionData,
      bio: bioData,
      image,
      display_order: display_order || 0,
    });

    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, bio, display_order } = req.body;

    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    if (req.file) {
      if (member.image && !member.image.startsWith("http")) {
        deleteImageFile(path.join(__dirname, "..", "uploads", member.image));
      }
      member.image = req.file.filename;
    }

    if (name) member.name = name;
    if (position)
      member.position =
        typeof position === "string" ? JSON.parse(position) : position;
    if (bio) member.bio = typeof bio === "string" ? JSON.parse(bio) : bio;
    if (display_order !== undefined) member.display_order = display_order;

    await member.save();
    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    if (member.image && !member.image.startsWith("http")) {
      deleteImageFile(path.join(__dirname, "..", "uploads", member.image));
    }

    await member.destroy();
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
