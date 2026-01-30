"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.roles, {
        foreignKey: "user_role",
      });
    }
  }
  User.init(
    {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_role: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "role_id",
        },
      },
      user_token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
