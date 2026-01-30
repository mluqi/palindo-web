"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role_acceses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role_acceses.belongsTo(models.roles, {
        foreignKey: "role_id",
      });
      role_acceses.belongsTo(models.menu, {
        foreignKey: "menu_id",
      });
    }
  }
  role_acceses.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "role_id",
        },
      },
      menu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "menu",
          key: "menu_id",
        },
      },
    },
    {
      sequelize,
      modelName: "role_acceses",
      timestamps: false,
    },
  );
  return role_acceses;
};
