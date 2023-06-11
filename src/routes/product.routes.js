const { Router } = require('express');
const upload = require('../utils/uploadFiles')
const { getAllProducts, createProduct } = require('../controllers/product.controllers');
const { updateProductDescription } = require('../controllers/product.controllers')
const authenticate = require('../middlewares/authenticate.middlewares')
const { updateProductDescValidator } = require('../validators/product.validator')

const router = Router();

router.get('/productAvaible', getAllProducts)

router.post('/products', authenticate, upload.single('productImage'), createProduct)

router.put('/products/:id', authenticate, updateProductDescValidator, updateProductDescription)

module.exports = router;