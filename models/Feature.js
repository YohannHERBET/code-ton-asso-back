'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feature.belongsToMany(models.Project, {
        through: 'ProjectFeatures'
      });
    }
  }
  Feature.init({
    label: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Feature',
  });
  return Feature;
};