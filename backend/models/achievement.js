"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achievement.init(
    {
      year: DataTypes.STRING,
      title: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("title");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "title",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      description: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("description");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "description",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      issuer: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("issuer");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "issuer",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Achievement",
    },
  );
  return Achievement;
};
