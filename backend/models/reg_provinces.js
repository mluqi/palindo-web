"use strict";

module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "reg_provinces",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Province.associate = function (models) {
    Province.hasMany(models.Regency, {
      foreignKey: "province_id",
      as: "regencies",
    });
  };

  return Province;
};
