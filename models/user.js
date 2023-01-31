'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Developer, {
        foreignKey: 'developer_id',
        as: 'developer'
      });
      User.belongsTo(models.Association, {
        foreignKey: 'association_id',
        as: 'association'
      });
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    developer_id: DataTypes.INTEGER,
    association_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};