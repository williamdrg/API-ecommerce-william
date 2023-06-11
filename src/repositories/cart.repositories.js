const { Cart } = require('../models')

const findCartByUserId = async (userId) => {
  return await Cart.findOne({where: {userId}})
}

const createCartForUser = async (userId) => {
  return await Cart.create({userId})
}

const updateCartTotalPrice = async (cartId, totalPrice) => {
  const cart = await Cart.findByPk(cartId)
  cart.totalPrice = totalPrice
  await cart.save()
  return cart
}


module.exports = {
  findCartByUserId,
  createCartForUser,
  updateCartTotalPrice
}