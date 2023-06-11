const { where } = require('sequelize');
const { ProductInCart, Cart } = require('../models');

const addProductToCart = async (productInCart) => {
  return await ProductInCart.create(productInCart);
}

const findProductInCart = async (productId, cartId) => {
  return await ProductInCart.findOne({ where: { productId, cartId } });
}

const updateProductInCart = async (productId, cartId, quantity, price) => {
  return await ProductInCart.update({ quantity, price }, { where: { productId, cartId } });
}

const findProductsInCart = async (cartId) => {
  return await ProductInCart.findAll({ where: { cartId } });
}

const removeProductFromCart = async (productId, cartId) => {
  const productInCart = await ProductInCart.findOne({ where: { productId, cartId } });
  
  if (!productInCart) {
    throw { status: 404, message: 'Product not found in the cart.'};
  }

  await productInCart.destroy();
}
// referencia alorder
const clearCart = async (cartId) => {
  await ProductInCart.destroy({ where: { cartId }});
  return await Cart.update({totalPrice: 0}, { where: {id: cartId }} )
}

module.exports = { 
  addProductToCart,
  findProductInCart,
  updateProductInCart,
  findProductsInCart,
  removeProductFromCart,
  clearCart
};
