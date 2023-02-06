'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Association extends Model {
    // comment here
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Association.hasOne(models.User, {
        foreignKey: 'association_id',
        as: 'user'
      });
      Association.hasMany(models.Project, {
        foreignKey: 'association_id',
        as: 'projects'
      });
      Association.belongsToMany(models.Category, {
        through: 'AssociationCategories'
      });
    }
  }
  Association.init({
    rna: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    association_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Association',
  });
  return Association;
};