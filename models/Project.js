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
      Project.belongsToMany(models.Developer, {
        through: 'DeveloperProjects'
      }),
      Project.belongsToMany(models.Feature, {
        through: 'ProjectFeatures'
      }),
      Project.belongsTo(models.Association, {
        foreignKey: 'association_id',
        as: 'association'
      }),
      Project.belongsTo(models.Type, {
        foreignKey: 'type_id',
        as: 'type'
      })
    }
  }
  Project.init({
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    other_features: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.ENUM('NotStarted', 'InProgress', 'Finished'),
      defaultValue: 'NotStarted',
      allowNull: false
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};