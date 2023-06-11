const { Router } = require('express');
const authenticate = require('../middlewares/authenticate.middlewares')
const {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart
} = require('../controllers/cart.controllers');
const { cartValidator } =require('../validators/cart.validator')

const router = Router();

router.get('/cart', authenticate, getCart); //mostrar el carrito para el usuario autenticado
router.post('/product_cart', authenticate, cartValidator, addProductToCart); //agregar productos al carrito
router.delete('/product/:productId', authenticate, removeProductFromCart); //Elimina un producto del carrito del usuario autenticado. El ID del producto a eliminar se pasa como parámetro en la ruta.
router.put('/product', authenticate, cartValidator, updateProductQuantityInCart); //actualizar la cantidad de un producto en específico 

module.exports = router;