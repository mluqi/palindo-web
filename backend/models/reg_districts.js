"use strict";

module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      regency_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "reg_districts",
      timestamps: false,
      freezeTableName: true,
    }
  );

  District.associate = function (models) {
    District.belongsTo(models.Regency, {
      foreignKey: "regency_id",
      as: "regency",
    });
    District.hasMany(models.Village, {
      foreignKey: "district_id",
      as: "villages",
    });
  };

  return District;
};
