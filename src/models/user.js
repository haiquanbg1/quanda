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
      User.hasMany(models.Answer, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Question, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.JSON,
    roles: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};