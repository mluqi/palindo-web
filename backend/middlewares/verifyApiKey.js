const { ApiKey } = require("../models");

const verifyApiKey = async (req, res, next) => {
  try {
    // Ambil API key dari header atau query parameter
    const apiKey =
      req.header("x-palindo-api-key")?.trim() || req.query.api_key?.trim();

    if (!apiKey) {
      return res.status(401).json({
        status: 401,
        message: "API key is required in header or query parameter.",
      });
    }

    // Cek apakah API key valid dan aktif
    const keyRecord = await ApiKey.findOne({
      where: { key: apiKey, active: true },
      attributes: ["key", "owner", "active"],
    });

    if (!keyRecord) {
      return res.status(403).json({
        status: 403,
        message: "Invalid or inactive API key.",
      });
    }

    // (Opsional) Simpan info API key di req untuk logging atau rate limit berbasis key
    req.apiKeyInfo = keyRecord;

    next();
  } catch (err) {
    console.error("API key verification error:", err);
    res.status(500).json({
      status: 500,
      message: "Internal server error during API key verification.",
    });
  }
};

module.exports = verifyApiKey;
