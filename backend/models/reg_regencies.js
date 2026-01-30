module.exports = (sequelize, DataTypes) => {
  const Regency = sequelize.define(
    "Regency",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      province_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "reg_regencies",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Regency.associate = (models) => {
    Regency.belongsTo(models.Province, {
      foreignKey: "province_id",
      as: "province",
    });
    Regency.hasMany(models.District, {
      foreignKey: "regency_id",
      as: "districts",
    });
  };

  return Regency;
};
