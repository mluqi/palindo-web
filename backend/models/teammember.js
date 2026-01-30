"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamMember.init(
    {
      name: DataTypes.STRING,
      position: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("position");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "position",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      bio: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("bio");
          try {
            return rawValue ? JSON.parse(rawValue) : null;
          } catch (e) {
            return rawValue;
          }
        },
        set(value) {
          this.setDataValue(
            "bio",
            typeof value === "object" ? JSON.stringify(value) : value,
          );
        },
      },
      image: DataTypes.STRING,
      display_order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TeamMember",
    },
  );
  return TeamMember;
};
