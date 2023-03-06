'use strict';
const { Model } = require('sequelize');
const DeveloperProjects = require('./DeveloperProjects');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Developer.hasOne(models.User, {
        foreignKey: 'developer_id',
        as: 'user',
      });
      Developer.belongsToMany(models.Skill, {
        through: 'DeveloperSkills',
      });
      Developer.belongsToMany(models.Project, {
        through: models.DeveloperProjects,
      });
    }
  }
  Developer.init(
    {
      type: {
        type: DataTypes.ENUM('Frontend', 'Backend', 'Fullstack'),
        allowNull: false,
      },
      work_preferences: {
        type: DataTypes.ENUM('Solo', 'Group', 'Both'),
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM('Junior', 'Intermediate', 'Senior'),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Developer',
    }
  );
  return Developer;
};
