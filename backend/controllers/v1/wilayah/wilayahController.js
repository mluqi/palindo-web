const { Province, Regency, District, Village } = require("../../../models");

// Get all provinces
exports.getAllProvinsi = async (req, res) => {
  try {
    const provinces = await Province.findAll();
    res.status(200).json({ status: "success", data: provinces });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve provinces",
      error: err.message,
    });
  }
};

// Get all regencies (kota) optionally filtered by province_id
exports.getKota = async (req, res) => {
  try {
    const { province_id } = req.query;
    const where = {};
    if (province_id) where.province_id = province_id;

    const regencies = await Regency.findAll({ where });
    res.status(200).json({ status: "success", data: regencies });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve regencies",
      error: err.message,
    });
  }
};

// Get all districts (kecamatan) optionally filtered by regency_id
exports.getKecamatan = async (req, res) => {
  try {
    const { regency_id } = req.query;
    const where = {};
    if (regency_id) where.regency_id = regency_id;

    const districts = await District.findAll({ where });
    res.status(200).json({ status: "success", data: districts });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve districts",
      error: err.message,
    });
  }
};

// Get all villages (kelurahan/desa) optionally filtered by district_id
exports.getKelurahan = async (req, res) => {
  try {
    const { district_id } = req.query;
    const where = {};
    if (district_id) where.district_id = district_id;

    const villages = await Village.findAll({ where });
    res.status(200).json({ status: "success", data: villages });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve villages",
      error: err.message,
    });
  }
};
