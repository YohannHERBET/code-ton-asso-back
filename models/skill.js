'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsToMany(models.Developer, {
        through: 'DeveloperSkills'
      });
    }
  }
  Skill.init({
    label: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'skill label',
    },
    value: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'skill value',
    },
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};