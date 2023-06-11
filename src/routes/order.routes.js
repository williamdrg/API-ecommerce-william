const { Router } = require('express');
const authenticate = require('../middlewares/authenticate.middlewares')
const { purchaseCart, getAllOrders } = require('../controllers/order.controllers')

const router = Router();

router.post('/orders', authenticate, purchaseCart)

router.get('/orders', authenticate, getAllOrders)

module.exports = router;