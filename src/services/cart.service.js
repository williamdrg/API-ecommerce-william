const { findCartByUserId, createCartForUser, updateCartTotalPrice} = require('../repositories/cart.repositories')
const { findProductsInCart, addProductToCart,  removeProductFromCart, updateProductInCart, findProductInCart } = require('../repositories/productInCart.repositories')
const { findProductById } = require('../repositories/product.repositories')

const getOrCreateCartForUser = async (userId) => {
  let cart = await findCartByUserId(userId)

  if (!cart) {
    cart = await createCartForUser(userId)
  }

  return cart
}

const getCartWithProductsForUser = async (userId) => {
  const cart = await getOrCreateCartForUser(userId)
  const { dataValues } = cart
  
  return {
    ...dataValues,
    products: await findProductsInCart(cart.id)
  }
  
}

const addProductToCartServices = async (userId, productId, quantity) => {
  const product = await findProductById(productId);
  if (!product) {
    throw { status: 404, message: 'Product not found.' };
  }

  
  if (product.availableQty < quantity) {
    throw { status: 400, message: 'Insufficient product quantity aaa' };
  }

  const cart = await findCartByUserId(userId);
  if (!cart) {
    throw { status: 404, message: 'Cart not found.' };
  }

  const productInCart = {
    cartId: cart.id,
    productId: product.id,
    quantity: quantity,
    price: product.price,
  };

  const addedProduct = await addProductToCart(productInCart);
  
  if (!addedProduct) {
    throw { status: 500, message: 'The product could not be added to the cart.' };
  }
  
  const newTotalPrice = Number(cart.totalPrice) + Number(product.price) * quantity
  await updateCartTotalPrice(cart.id, newTotalPrice)
 
  return addedProduct;
};

const removeProductFromCartService = async (userId, productId) => {
  const cart = await findCartByUserId(userId)
  if (!cart) {
    throw { status: 404, message: 'Cart not found.' }
  }

  const productInCart = await findProductInCart(productId, cart.id)
  if (!productInCart) {
    throw { status: 404, message: 'Product not found in the cart.'};
  }

  // con esto se calcula el precio total del producto que se eliminará
  const priceToReduce = productInCart.price * productInCart.quantity

  // luego actualizamos el precio total del carrito 
  cart.totalPrice -= priceToReduce
  await updateCartTotalPrice(cart.id, cart.totalPrice)


  return await removeProductFromCart(productId, cart.id)
}

const updateProductQuantityInCartService = async (userId, productId, quantity) => {
  const cart = await getOrCreateCartForUser(userId)
  if (!cart) {
    throw { status: 404, message: 'Cart not found.' }
  }

  const productInCart = await findProductInCart(productId, cart.id)
  if (!productInCart) {
    throw { status: 404, message: 'Product not found in the cart.'};
  }

  const product = await findProductById(productId);
  if (!product) {
    throw { status: 404, message: 'Producto no encontrado.'};
  }

  quantity = Number(quantity);

  // se determina la diferencia entre la cantidad antigua y la nueva
  const quantityDiff = quantity - productInCart.quantity;
  
  // Luego se calcula el cambio en el precio total
  const priceChange = quantityDiff * product.price;

  // luego se actualiza la cantidad del producto en el carrito
  await updateProductInCart(productId, cart.id, quantity, product.price);

  // Actualizar el precio total en el carrito
  const newTotalPrice = cart.totalPrice + priceChange;
  await updateCartTotalPrice(cart.id, newTotalPrice);

  return productInCart;
}

module.exports = {
  getOrCreateCartForUser,
  getCartWithProductsForUser,
  addProductToCartServices,
  removeProductFromCartService,
  updateProductQuantityInCartService
}