'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Association extends Model {
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
    rna: DataTypes.STRING,
    association_name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Association',
  });
  return Association;
};