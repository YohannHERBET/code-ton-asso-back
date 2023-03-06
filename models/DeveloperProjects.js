'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeveloperProjects extends Model {}
  DeveloperProjects.init(
    {},
    {
      sequelize,
      modelName: 'DeveloperProjects',
    }
  );
  return DeveloperProjects;
};
