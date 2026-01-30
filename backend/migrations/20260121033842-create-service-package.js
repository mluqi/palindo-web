'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServicePackages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.JSON
      },
      speed: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      original_price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.JSON
      },
      discount_note: {
        type: Sequelize.JSON
      },
      image: {
        type: Sequelize.STRING
      },
      is_highlighted: {
        type: Sequelize.BOOLEAN
      },
      display_order: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ServicePackages');
  }
};