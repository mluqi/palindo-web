"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("JobApplicants", "nilai_akhir_ipk", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      after: "school",
    });

    await queryInterface.addColumn("JobApplicants", "instagram_link", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      after: "portfolio_file",
    });

    await queryInterface.addColumn("JobApplicants", "linkedin_link", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      after: "instagram_link",
    });

    await queryInterface.addColumn("JobApplicants", "tiktok_link", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      after: "linkedin_link",
    });

    await queryInterface.addColumn("JobApplicants", "pelatihan_name", {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      after: "tiktok_link",
    });

    await queryInterface.addColumn("JobApplicants", "pelatihan_orgaisasi", {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      after: "pelatihan_name",
    });

    await queryInterface.addColumn("JobApplicants", "pelatihan_date", {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      after: "pelatihan_orgaisasi",
    });

    await queryInterface.addColumn("JobApplicants", "pelatihan_expired", {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      after: "pelatihan_date",
    });

    await queryInterface.addColumn(
      "JobApplicants",
      "pelatihan_id_credentials",
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
        after: "pelatihan_expired",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("JobApplicants", "instagram_link");
    await queryInterface.removeColumn("JobApplicants", "linkedin_link");
    await queryInterface.removeColumn("JobApplicants", "tiktok_link");
    await queryInterface.removeColumn("JobApplicants", "pelatihan_name");
    await queryInterface.removeColumn("JobApplicants", "pelatihan_orgaisasi");
    await queryInterface.removeColumn("JobApplicants", "pelatihan_date");
    await queryInterface.removeColumn("JobApplicants", "pelatihan_expired");
    await queryInterface.removeColumn(
      "JobApplicants",
      "pelatihan_id_credentials",
    );
  },
};
