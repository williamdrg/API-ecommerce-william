const { findOrdersByUserId } = require('../repositories/order.repositorie')
const { findUserById } = require('../repositories/user.repositories')
const { getCartWithProductsForUser } = require('../services/cart.service')
const { completePurchase } = require('../services/order.service')
const { sendPurchaseConfirmationMail } = require('../utils/sendMails')

const purchaseCart = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await findUserById(userId)
    const cart = await getCartWithProductsForUser(userId)
    await completePurchase(userId, cart)

    sendPurchaseConfirmationMail(user.email, { username: user.username })
    
    res.json({ message: 'Purchase completed successfully' })
  } catch (error) {
    next(error)
  }
}

const getAllOrders = async (req, res, next) => {
  try {
    const userId = req.user.id
    const orders = await findOrdersByUserId(userId)

    res.json(orders)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  purchaseCart,
  getAllOrders
}