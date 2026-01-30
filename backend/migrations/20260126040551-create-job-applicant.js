"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JobApplicants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      job_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      job_title_applied: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      education: {
        type: Sequelize.STRING,
      },
      major: {
        type: Sequelize.STRING,
      },
      school: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      current_status: {
        type: Sequelize.STRING,
      },
      has_experience: {
        type: Sequelize.BOOLEAN,
      },
      experience_position: {
        type: Sequelize.STRING,
      },
      willing_to_relocate: {
        type: Sequelize.BOOLEAN,
      },
      cv_file: {
        type: Sequelize.STRING,
      },
      portfolio_file: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "seleksi_administrasi",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("JobApplicants");
  },
};
