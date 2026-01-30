'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class herobanner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  herobanner.init({
    desktop_image: DataTypes.TEXT,
    mobile_image: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN,
    display_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'herobanner',
    timestamps: false
  });
  return herobanner;
};