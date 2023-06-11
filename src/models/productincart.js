'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductInCart.belongsTo(models.Product, { foreignKey: 'productId' })
      ProductInCart.belongsTo(models.Cart, { foreignKey: 'cartId' })
    }
  }
  ProductInCart.init({
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'cart_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    status:{ 
      type: DataTypes.BOOLEAN,
    defaultValue: false 
  }
  }, {
    sequelize,
    modelName: 'ProductInCart',
    tableName: 'product_in_carts',
  });
  return ProductInCart;
};