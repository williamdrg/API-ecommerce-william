'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId' })
      Product.hasMany(models.ProductInCart, { foreignKey: 'productId' })
      Product.hasMany(models.ProductInOrder, { foreignKey: 'productId' })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2),
    availableQty: {
      type: DataTypes.INTEGER,
      field: 'available_qty',
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,      
      },
    },
    status: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'product_image'
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
    hooks: {
      beforeSave: (product, options) => {
        product.status = product.availableQty > 0 ? 'disponible' : 'agotado';
      }
    },
  });
  return Product;
};