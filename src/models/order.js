'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.hasMany(models.ProductInOrder, { foreignKey: 'orderId'})
    }
  }
  Order.init({
    totalPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      field: 'total_price'
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    status: {
      type: DataTypes.STRING, 
      defaultValue: 'notPurchased'
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  });
  return Order;
};