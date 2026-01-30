"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicePackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServicePackage.init(
    {
      category: DataTypes.STRING,
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
      speed: DataTypes.STRING,
      price: DataTypes.INTEGER,
      original_price: DataTypes.INTEGER,
      discount: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("discount");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "discount",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      discount_note: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("discount_note");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "discount_note",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      image: DataTypes.STRING,
      is_highlighted: DataTypes.BOOLEAN,
      display_order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ServicePackage",
    },
  );
  return ServicePackage;
};
