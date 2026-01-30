const express = require("express");
const router = express.Router();
const verifyApiKey = require("../../../middlewares/verifyApiKey");
const {
  getAllProvinsi,
  getKota,
  getKecamatan,
  getKelurahan,
} = require("../../../controllers/v1/wilayah/wilayahController");

/**
 * @swagger
 * tags:
 *   name: Wilayah
 *   description: API Data Wilayah Administratif Indonesia (Provinsi, Kota/Kab, Kecamatan, Kelurahan)
 */

/**
 * @swagger
 * /api/v1/wilayah/provinsi:
 *   get:
 *     summary: Mendapatkan daftar semua provinsi
 *     tags: [Wilayah]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data provinsi
 *       401:
 *         description: API Key tidak ada
 *       403:
 *         description: API Key tidak valid
 */
router.get("/provinsi", verifyApiKey, getAllProvinsi);

/**
 * @swagger
 * /api/v1/wilayah/kota:
 *   get:
 *     summary: Mendapatkan daftar kota/kabupaten
 *     tags: [Wilayah]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: province_id
 *         schema:
 *           type: string
 *         description: Filter berdasarkan ID Provinsi
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data kota/kabupaten
 *       401:
 *         description: API Key tidak ada
 *       403:
 *         description: API Key tidak valid
 */
router.get("/kota", verifyApiKey, getKota);

/**
 * @swagger
 * /api/v1/wilayah/kecamatan:
 *   get:
 *     summary: Mendapatkan daftar kecamatan
 *     tags: [Wilayah]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: regency_id
 *         schema:
 *           type: string
 *         description: Filter berdasarkan ID Kota/Kabupaten
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data kecamatan
 *       401:
 *         description: API Key tidak ada
 *       403:
 *         description: API Key tidak valid
 */
router.get("/kecamatan", verifyApiKey, getKecamatan);

/**
 * @swagger
 * /api/v1/wilayah/kelurahan:
 *   get:
 *     summary: Mendapatkan daftar kelurahan/desa
 *     tags: [Wilayah]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: district_id
 *         schema:
 *           type: string
 *         description: Filter berdasarkan ID Kecamatan
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data kelurahan
 *       401:
 *         description: API Key tidak ada
 *       403:
 *         description: API Key tidak valid
 */
router.get("/kelurahan", verifyApiKey, getKelurahan);

module.exports = router;