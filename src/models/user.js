'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'userId' })
      User.hasOne(models.Cart, { foreignKey: 'userId'})
      User.hasMany(models.Order, { foreignKey: 'userId'})
      User.hasMany(models.PasswordReset, { foreignKey: 'userId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  });
  return User;
};