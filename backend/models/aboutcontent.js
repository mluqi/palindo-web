"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AboutContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AboutContent.init(
    {
      section: DataTypes.STRING,
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
      image: DataTypes.STRING,
      additional_images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("additional_images");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "additional_images",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      items: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("items");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "items",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
    },
    {
      sequelize,
      modelName: "AboutContent",
    },
  );
  return AboutContent;
};
