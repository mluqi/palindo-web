const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobBySlug,
  createJob,
  applyJob,
  getAllApplicants,
  getAdminJobs,
  updateJob,
  deleteJob,
  getJobFilters,
  getAdminJobById,
  getJobTitles,
  updateApplicantStatus,
  downloadJobCVs,
  exportJobApplicants,
} = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");
const documentUpload = require("../middlewares/documentMiddleware");

// Public Routes (Job Listing)
router.get("/filters", getJobFilters);
router.get("/", getAllJobs);
router.get("/:slug", getJobBySlug);

// Public Route (Apply)
router.post(
  "/apply",
  documentUpload.fields([
    { name: "cv", maxCount: 1 },
    { name: "portofolio", maxCount: 1 },
  ]),
  applyJob,
);

// Admin Routes
router.post("/", authMiddleware, createJob); // Create Job
router.get("/applicants/all", authMiddleware, getAllApplicants); // View Applicants
router.put("/applicants/:id/status", authMiddleware, updateApplicantStatus); // Update Status

// Admin Management Routes
router.get("/admin/list", authMiddleware, getAdminJobs);
router.get("/admin/list/:id", authMiddleware, getAdminJobById);
router.get("/admin/jobs/:id/download-cvs", authMiddleware, downloadJobCVs);
router.get("/admin/jobs/:id/export-excel", authMiddleware, exportJobApplicants);
router.get("/admin/titles", authMiddleware, getJobTitles);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
