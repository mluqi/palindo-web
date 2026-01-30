"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roles.hasMany(models.role_acceses, {
        foreignKey: "role_id",
      });
      roles.hasMany(models.User, {
        foreignKey: "user_role",
      });
    }
  }
  roles.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      role_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "roles",
      timestamps: false,
    },
  );
  return roles;
};
