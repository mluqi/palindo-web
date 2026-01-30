"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobApplicant extends Model {
    static associate(models) {
      JobApplicant.belongsTo(models.Job, { foreignKey: "job_id" });
    }
  }
  JobApplicant.init(
    {
      job_id: DataTypes.INTEGER,
      job_title_applied: DataTypes.STRING, // Backup jika job dihapus
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      age: DataTypes.INTEGER,
      education: DataTypes.STRING,
      major: DataTypes.STRING,
      school: DataTypes.STRING,
      nilai_akhir_ipk: DataTypes.FLOAT,
      address: DataTypes.TEXT,
      current_status: DataTypes.STRING,
      has_experience: DataTypes.BOOLEAN,
      experience_position: DataTypes.STRING,
      willing_to_relocate: DataTypes.BOOLEAN,
      cv_file: DataTypes.STRING,
      portfolio_file: DataTypes.STRING,
      instagram_link: DataTypes.STRING,
      linkedin_link: DataTypes.STRING,
      tiktok_link: DataTypes.STRING,
      pelatihan_name: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("pelatihan_name");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "pelatihan_name",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      pelatihan_orgaisasi: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("pelatihan_orgaisasi");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "pelatihan_orgaisasi",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      pelatihan_date: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("pelatihan_date");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "pelatihan_date",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      pelatihan_expired: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("pelatihan_expired");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "pelatihan_expired",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      pelatihan_id_credentials: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("pelatihan_id_credentials");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "pelatihan_id_credentials",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      status: { type: DataTypes.STRING, defaultValue: "seleksi_administrasi" },
    },
    {
      sequelize,
      modelName: "JobApplicant",
    },
  );
  return JobApplicant;
};
