'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      menu.belongsToMany(models.roles, {
        through: 'role_acceses',
        foreignKey: 'menu_id',
        otherKey: 'role_id'
      });
    }
  }
  menu.init({
    menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    menu_name: DataTypes.STRING,
    menu_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
    timestamps: false
  });
  return menu;
};