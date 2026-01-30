"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init(
    {
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
      slug: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT("long"), // Menggunakan LONGTEXT untuk konten yang panjang
        get() {
          const rawValue = this.getDataValue("content");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "content",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      excerpt: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("excerpt");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "excerpt",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      category: DataTypes.STRING,
      tags: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("tags");
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue(
            "tags",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      read_time: DataTypes.STRING,
      is_featured: DataTypes.BOOLEAN,
      is_published: DataTypes.BOOLEAN,
      published_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Article",
    },
  );
  return Article;
};
