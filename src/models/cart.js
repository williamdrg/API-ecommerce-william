'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId' })
      Cart.hasMany(models.ProductInCart, { foreignKey: 'cartId' })
    }
  }
  Cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      field: 'total_price',
      defaultValue: 0
    },
    }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    });
  return Cart;
};