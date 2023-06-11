const { 
  getOrCreateCartForUser, 
  getCartWithProductsForUser, 
  addProductToCartServices, 
  updateProductQuantityInCartService,
  removeProductFromCartService 
} =require('../services/cart.service')

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cart = await getCartWithProductsForUser(userId)

    res.json(cart)
  } catch (error) {
    next(error)
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body

    await getOrCreateCartForUser(userId)
    await addProductToCartServices(userId, productId, quantity)

    res.json({ message: 'Product added to cart successfully'})
  } catch (error) {
    next(error)
  }
}

const removeProductFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { productId } = req.params

    await removeProductFromCartService(userId, productId)

    res.json({ message: 'Product removed from cart successfully'})
  } catch (error) {
    next(error)
  }
}

const updateProductQuantityInCart = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body

    await updateProductQuantityInCartService(userId, productId, quantity)

    res.json({ message: 'Product quantity updated successfully'})
  } catch (error) {
    next(error)
  }
}

module.exports = { 
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart
};