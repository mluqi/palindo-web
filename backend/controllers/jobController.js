const { Job, JobApplicant, sequelize } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const ExcelJS = require("exceljs");

// --- JOB VACANCY CONTROLLERS ---

exports.getAllJobs = async (req, res) => {
  try {
    const { location, department, search, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;
    let whereClause = { is_active: true };

    if (location && location !== "all") whereClause.location = location;
    if (department && department !== "all") whereClause.department = department;
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` }; // Note: This searches JSON string, might need adjustment for strict JSON search
    }

    const { count, rows } = await Job.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["posted_at", "DESC"]],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      jobs: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.downloadJobCVs = async (req, res) => {
  try {
    const { id } = req.params;
    const applicants = await JobApplicant.findAll({
      where: {
        job_id: id,
        cv_file: { [Op.ne]: null },
      },
      include: [{ model: Job, attributes: ["title"] }],
    });

    if (applicants.length === 0) {
      return res.status(404).json({ message: "No CVs found for this job." });
    }

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.on("error", (err) => {
      throw err;
    });

    const jobTitle = applicants[0].Job
      ? applicants[0].Job.title.replace(/[^a-z0-9]/gi, "_")
      : `Job_${id}`;
    const date = new Date().toISOString().split("T")[0];
    const zipFilename = `CV_${jobTitle}_${date}.zip`;

    // Set headers agar browser mengenali ini sebagai file download
    res.attachment(zipFilename);

    archive.pipe(res);

    applicants.forEach((applicant) => {
      if (applicant.cv_file) {
        const filePath = path.join(
          __dirname,
          "../uploads/documents",
          applicant.cv_file,
        );

        if (fs.existsSync(filePath)) {
          // Buat nama file yang rapi: CV_Nama_Posisi_Date.ext
          const ext = path.extname(applicant.cv_file);
          const safeName = applicant.name.replace(/[^a-z0-9]/gi, "_");
          const fileName = `CV_${safeName}_${jobTitle}_${date}${ext}`;

          archive.file(filePath, { name: fileName });
        }
      }
    });

    await archive.finalize();
  } catch (error) {
    console.error("Error downloading CVs:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.exportJobApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    const whereClause = { job_id: id };
    if (status && status !== "all") {
      whereClause.status = status;
    }

    const applicants = await JobApplicant.findAll({
      where: whereClause,
      include: [{ model: Job, attributes: ["title"] }],
      order: [["createdAt", "DESC"]],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pelamar");

    // Definisi Kolom
    worksheet.columns = [
      { header: "Timestamp", key: "createdAt", width: 20 },
      { header: "Nama Lengkap", key: "name", width: 30 },
      { header: "Usia", key: "age", width: 10 },
      { header: "Pendidikan Terakhir", key: "education", width: 20 },
      { header: "Jurusan", key: "major", width: 20 },
      { header: "Sekolah / Universitas", key: "school", width: 30 },
      { header: "Nilai Akhir/IPK", key: "nilai_akhir_ipk", width: 15 },
      { header: "Domisili / Alamat", key: "address", width: 40 },
      { header: "Email", key: "email", width: 30 },
      { header: "No. HP (WhatsApp)", key: "phone", width: 20 },
      { header: "Instagram", key: "instagram_link", width: 30 },
      { header: "LinkedIn", key: "linkedin_link", width: 30 },
      { header: "TikTok", key: "tiktok_link", width: 30 },
      { header: "Posisi yang dipilih", key: "job_title", width: 30 },
      { header: "Status saat ini", key: "current_status", width: 20 },
      {
        header: "Memiliki pengalaman relevan?",
        key: "has_experience",
        width: 25,
      },
      {
        header: "Posisi pengalaman relevan",
        key: "experience_position",
        width: 30,
      },
      {
        header: "Bersedia ditempatkan?",
        key: "willing_to_relocate",
        width: 25,
      },
      { header: "CV (Link)", key: "cv_link", width: 50 },
      { header: "Portofolio (Link)", key: "portfolio_link", width: 50 },
    ];

    // Base URL untuk file
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/documents/`;

    applicants.forEach((app) => {
      worksheet.addRow({
        createdAt: app.createdAt.toLocaleString("id-ID"),
        name: app.name,
        age: app.age,
        education: app.education,
        major: app.major,
        school: app.school,
        nilai_akhir_ipk: app.nilai_akhir_ipk,
        address: app.address,
        email: app.email,
        phone: app.phone,
        instagram_link: app.instagram_link,
        linkedin_link: app.linkedin_link,
        tiktok_link: app.tiktok_link,
        job_title: app.Job ? app.Job.title : app.job_title_applied,
        current_status: app.current_status,
        has_experience: app.has_experience ? "Ya" : "Tidak",
        experience_position: app.experience_position,
        willing_to_relocate: app.willing_to_relocate ? "Ya" : "Tidak",
        cv_link: app.cv_file ? baseUrl + app.cv_file : "",
        portfolio_link: app.portfolio_file ? baseUrl + app.portfolio_file : "",
      });
    });

    // Styling Header
    worksheet.getRow(1).font = { bold: true };

    const jobTitle =
      applicants.length > 0 && applicants[0].Job
        ? applicants[0].Job.title.replace(/[^a-z0-9]/gi, "_")
        : `Job_${id}`;
    const filename = `Applicants_${jobTitle}_${new Date().toISOString().split("T")[0]}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting excel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getJobFilters = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      attributes: ["location", "department"],
      where: { is_active: true },
    });

    const locations = [
      ...new Set(jobs.map((job) => job.location).filter(Boolean)),
    ].sort();
    const departments = [
      ...new Set(jobs.map((job) => job.department).filter(Boolean)),
    ].sort();

    res.status(200).json({ locations, departments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getJobTitles = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      attributes: ["id", "title"],
      order: [["title", "ASC"]],
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAdminJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAdminJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
        { department: { [Op.like]: `%${search}%` } },
      ];
    }

    if (status && status !== "all") {
      whereClause.is_active = status === "active";
    }

    const { count, rows } = await Job.findAndCountAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM JobApplicants AS applicant
              WHERE
                applicant.job_id = Job.id
            )`),
            "applicantCount",
          ],
        ],
      },
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["posted_at", "DESC"]],
    });
    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      jobs: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getJobBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const job = await Job.findOne({ where: { slug, is_active: true } });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      location,
      department,
      type,
      description,
      requirements,
      responsibilities,
    } = req.body;

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Date.now();

    const newJob = await Job.create({
      title,
      slug,
      location,
      department,
      type,
      description,
      requirements,
      responsibilities,
      posted_at: new Date(),
    });
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      location,
      department,
      type,
      description,
      requirements,
      responsibilities,
      is_active,
    } = req.body;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Update slug if title changes
    if (title && title !== job.title) {
      job.slug =
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now();
    }

    job.title = title;
    job.location = location;
    job.department = department;
    job.type = type;
    job.description = description;
    job.requirements = requirements;
    job.responsibilities = responsibilities;
    if (is_active !== undefined) job.is_active = is_active;

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- APPLICANT CONTROLLERS ---

exports.applyJob = async (req, res) => {
  try {
    const {
      namaLengkap,
      usia,
      pendidikanTerakhir,
      jurusan,
      sekolahUniversitas,
      domisili,
      email,
      noHp,
      posisi,
      jobId,
      statusSaatIni,
      pengalamanRelevan,
      posisiPengalaman,
      bersediaDitempatkan,
      instagram,
      linkedin,
      tiktok,
      pelatihan_name,
      pelatihan_orgaisasi,
      pelatihan_date,
      pelatihan_expired,
      pelatihan_id_credentials,
      nilai_akhir_ipk,
    } = req.body;

    let job;

    // 1. Cari Job berdasarkan ID jika ada
    if (jobId) {
      const id = Array.isArray(jobId) ? jobId[0] : jobId;
      job = await Job.findByPk(id);
    }

    // 2. Jika tidak ketemu by ID, cari berdasarkan posisi (slug atau title)
    if (!job && posisi) {
      job = await Job.findOne({
        where: {
          [Op.or]: [{ slug: posisi }, { title: posisi }],
        },
      });
    }

    // 3. Validasi Duplikasi Pelamar
    if (job) {
      const existingApplicant = await JobApplicant.findOne({
        where: {
          email: email,
          job_id: job.id,
        },
      });

      if (existingApplicant) {
        return res.status(400).json({
          message: "Anda sudah pernah melamar untuk posisi ini sebelumnya.",
        });
      }
    }

    const cvFile = req.files["cv"] ? req.files["cv"][0].filename : null;
    const portfolioFile = req.files["portofolio"]
      ? req.files["portofolio"][0].filename
      : null;

    const newApplicant = await JobApplicant.create({
      job_id: job ? job.id : null,
      job_title_applied: posisi, // Simpan string aslinya sebagai backup
      name: namaLengkap,
      age: parseInt(usia),
      education: pendidikanTerakhir,
      major: jurusan,
      school: sekolahUniversitas,
      address: domisili,
      email: email,
      phone: noHp,
      current_status: statusSaatIni,
      has_experience: pengalamanRelevan === "Ya",
      experience_position: posisiPengalaman,
      willing_to_relocate: bersediaDitempatkan === "Ya",
      cv_file: cvFile,
      portfolio_file: portfolioFile,
      instagram_link: instagram,
      linkedin_link: linkedin,
      tiktok_link: tiktok,
      pelatihan_name,
      pelatihan_orgaisasi,
      pelatihan_date,
      pelatihan_expired,
      pelatihan_id_credentials,
      nilai_akhir_ipk: nilai_akhir_ipk ? parseFloat(nilai_akhir_ipk) : null,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      applicantId: newApplicant.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllApplicants = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, job_id } = req.query;
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    if (status && status !== "all") {
      whereClause.status = status;
    }

    if (job_id && job_id !== "all") {
      whereClause.job_id = job_id;
    }

    const { count, rows } = await JobApplicant.findAndCountAll({
      where: whereClause,
      include: [{ model: Job, attributes: ["title"] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      applicants: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const applicant = await JobApplicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = status;
    await applicant.save();

    res.status(200).json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
