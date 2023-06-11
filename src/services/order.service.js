const { findProductsInCart } = require('../repositories/productInCart.repositories')
const { createOrder, addProductToOrder } = require('../repositories/order.repositorie')
const { clearCart } = require('../repositories/productInCart.repositories')
const { getOrCreateCartForUser } = require('../services/cart.service')
const { reduceProductQuantity } = require('./product.service')

const completePurchase = async (userId) => {
  const cart = await getOrCreateCartForUser(userId);
  if (!cart) {
    throw { status: 404, message: 'Carrito no encontrado' }
  }

  const productsInCart = await findProductsInCart(cart.id);
  if (productsInCart.length === 0) {
    throw { status: 400, message: 'El carrito está vacío' }
  }

  const order = await createOrder(userId, cart.totalPrice);
  // recorrer todos los productos que esten en el carrito y añade cada producto a la orden
  for (const productInCart of productsInCart) {
    await addProductToOrder(order, productInCart);
    await reduceProductQuantity(productInCart.productId, productInCart.quantity);
  }

  order.status = 'purchased'
  await order.save()

  await clearCart(cart.id);
  return order;
}

module.exports = {
  completePurchase
}