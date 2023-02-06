'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    other_features: DataTypes.STRING,
    release_date: DataTypes.DATE,
    slug: DataTypes.STRING,
    visible: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('NotStarted', 'InProgress', 'Finished'),
    type_id: DataTypes.INTEGER,
    association_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};