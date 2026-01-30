"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.hasMany(models.JobApplicant, { foreignKey: "job_id" });
    }
  }
  Job.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      location: DataTypes.STRING,
      department: DataTypes.STRING,
      type: DataTypes.STRING, // Full-time, Contract, etc
      description: DataTypes.TEXT,
      requirements: {
        type: DataTypes.TEXT, // Array of strings
        get() {
          const rawValue = this.getDataValue("requirements");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "requirements",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      responsibilities: {
        type: DataTypes.TEXT, // Array of strings
        get() {
          const rawValue = this.getDataValue("responsibilities");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "responsibilities",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      posted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Job",
    },
  );
  return Job;
};
