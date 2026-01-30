const { Article } = require("../models");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

// Helper: Hapus file gambar
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Helper: Generate Slug Unik
const generateSlug = async (title, currentId = null) => {
  // Ambil judul bahasa Indonesia sebagai default untuk slug, atau bahasa lain jika tidak ada
  const titleString =
    typeof title === "object"
      ? title.id || title.en || Object.values(title)[0]
      : title;

  let slug = titleString
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // Cek keunikan slug
  let whereClause = { slug };
  if (currentId) {
    whereClause.id = { [Op.ne]: currentId };
  }

  let count = await Article.count({ where: whereClause });
  let suffix = 1;
  let originalSlug = slug;

  while (count > 0) {
    slug = `${originalSlug}-${suffix}`;
    whereClause.slug = slug;
    count = await Article.count({ where: whereClause });
    suffix++;
  }

  return slug;
};

// Helper: Ekstrak nama file gambar dari konten HTML
const extractImageFilenames = (htmlContent) => {
  if (!htmlContent) return [];
  const regex = /<img[^>]+src="([^">]+)"/g;
  const filenames = [];
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const src = match[1];
    // Asumsi format URL: http://domain/uploads/filename.jpg
    // Kita ambil bagian setelah '/uploads/'
    if (src.includes("/uploads/")) {
      const filename = src.split("/uploads/")[1];
      if (filename) filenames.push(filename);
    }
  }
  return filenames;
};

exports.uploadArticleImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
};

exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      author,
      category,
      tags,
      read_time,
      is_featured,
      is_published,
      published_at,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    // Parse JSON strings dari FormData
    const titleData = typeof title === "string" ? JSON.parse(title) : title;
    const contentData =
      typeof content === "string" ? JSON.parse(content) : content;
    const excerptData =
      typeof excerpt === "string" ? JSON.parse(excerpt) : excerpt;

    const slug = await generateSlug(titleData);

    // Pastikan tags disimpan sebagai string JSON
    let tagsData = tags;
    if (typeof tags === "object") {
      tagsData = JSON.stringify(tags);
    }

    const newArticle = await Article.create({
      title: titleData,
      slug,
      content: contentData,
      excerpt: excerptData,
      image,
      author,
      category,
      tags: tagsData,
      read_time,
      is_featured: is_featured === "true" || is_featured === true,
      is_published: is_published === "true" || is_published === true,
      published_at: published_at || new Date(),
    });

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    const { count, rows } = await Article.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["published_at", "DESC"]],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      articles: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPublishedArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = { is_published: true };
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    const { count, rows } = await Article.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["published_at", "DESC"]],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      articles: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ where: { slug } });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tags, is_featured, is_published, content, ...otherFields } =
      req.body;

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // 1. Cek Penghapusan Gambar di Konten (Cleanup)
    if (content && content !== article.content) {
      // Parse content baru jika string
      const newContentObj =
        typeof content === "string" ? JSON.parse(content) : content;

      // Gabungkan semua gambar dari semua bahasa
      const oldImages = [
        ...extractImageFilenames(article.content?.id),
        ...extractImageFilenames(article.content?.en),
        ...extractImageFilenames(article.content?.cn),
      ];
      const newImages = [
        ...extractImageFilenames(newContentObj?.id),
        ...extractImageFilenames(newContentObj?.en),
        ...extractImageFilenames(newContentObj?.cn),
      ];

      // Cari gambar yang ada di lama tapi TIDAK ada di baru
      const deletedImages = oldImages.filter((img) => !newImages.includes(img));

      deletedImages.forEach((filename) => {
        // Pastikan tidak menghapus featured image jika kebetulan sama
        if (filename !== article.image) {
          deleteImageFile(path.join(__dirname, "..", "uploads", filename));
        }
      });
    }

    // Handle Image Update
    if (req.file) {
      deleteImageFile(path.join(__dirname, "..", "uploads", article.image));
      article.image = req.file.filename;
    }

    // Handle Slug Update jika title berubah
    if (title && title !== article.title) {
      const titleData = typeof title === "string" ? JSON.parse(title) : title;
      // Cek jika title ID berubah
      if (JSON.stringify(titleData) !== JSON.stringify(article.title)) {
        article.slug = await generateSlug(titleData, id);
        article.title = titleData;
      }
    }

    // Update field lainnya
    Object.assign(article, otherFields);
    if (content)
      article.content =
        typeof content === "string" ? JSON.parse(content) : content;
    if (excerpt)
      article.excerpt =
        typeof excerpt === "string" ? JSON.parse(excerpt) : excerpt;

    if (tags)
      article.tags = typeof tags === "object" ? JSON.stringify(tags) : tags;
    if (is_featured !== undefined)
      article.is_featured = is_featured === "true" || is_featured === true;
    if (is_published !== undefined)
      article.is_published = is_published === "true" || is_published === true;

    await article.save();
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    // Hapus Featured Image
    if (article.image)
      deleteImageFile(path.join(__dirname, "..", "uploads", article.image));

    // Hapus Semua Gambar dalam Konten
    const contentImages = [
      ...extractImageFilenames(article.content?.id),
      ...extractImageFilenames(article.content?.en),
      ...extractImageFilenames(article.content?.cn),
    ];

    contentImages.forEach((filename) => {
      if (filename !== article.image) {
        deleteImageFile(path.join(__dirname, "..", "uploads", filename));
      }
    });

    await article.destroy();
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
