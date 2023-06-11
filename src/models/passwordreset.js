'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
   
    static associate(models) {
      PasswordReset.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  PasswordReset.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PasswordReset',
    tableName: 'password_resets',
    timestamps: false
  });
  return PasswordReset;
};