'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Developer.init({
    type: DataTypes.ENUM('Frontend', 'Backend', 'Fullstack'),
    work_preferences: DataTypes.ENUM('Solo', 'Group', 'Both'),
    level: DataTypes.ENUM('Junior', 'Intermediate', 'Senior'),
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};