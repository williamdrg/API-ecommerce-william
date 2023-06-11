const { Order, ProductInOrder } = require('../models')

const createOrder = async (userId, totalPrice) => {
 
  const order = await Order.create({
    userId,
    totalPrice
  })

  return order
}

const addProductToOrder = async (order, productInCart) => {
  await ProductInOrder.create({
    orderId: order.id,
    productId: productInCart.productId,
    quantity: productInCart.quantity,
    price: productInCart.price,
  });
}

const findOrdersByUserId = async (userId) => {
  return await Order.findAll({ where: { userId } });
}

module.exports = {
  createOrder,
  addProductToOrder,
  findOrdersByUserId
}