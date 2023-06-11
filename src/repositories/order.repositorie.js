const { Order, ProductInOrder, Product } = require('../models')

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
  return await Order.findAll({
    where: { userId },
    attributes: { exclude: ['updatedAt'] }, 
    include: [
      {
        model: ProductInOrder,
        attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: Product,
            attributes: { exclude: ['price', 'availableQty', 'userId'] },
          }
        ]
      }
    ]
  });
}

module.exports = {
  createOrder,
  addProductToOrder,
  findOrdersByUserId
}