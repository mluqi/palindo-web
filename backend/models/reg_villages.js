"use strict";

module.exports = (sequelize, DataTypes) => {
  const Village = sequelize.define(
    "Village",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      district_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "reg_villages",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Village.associate = function (models) {
    Village.belongsTo(models.District, {
      foreignKey: "district_id",
      as: "district",
    });
  };

  return Village;
};
