const product = require('../models/product')
const { 
  getAllAviableProducts, 
  findProductByName, 
  createProduct, 
  updateProductDescription,
  findProductById 
} = require('../repositories/product.repositories')

const getProductsServices = async () => {
  return await getAllAviableProducts()
}

const registerProductServices = async (product, image) => {
  const exitingName = await findProductByName(product.name)
  
  if (exitingName) {
    throw { status: 400, message: 'This product already exists.'}
  }

  return await createProduct(product, image)
}

const updateProductServices = async (userId, productId, description) => {
  const product = await findProductById(productId);

  if (product.userId !== userId) {
    throw { status: 403, message: 'You do not have permission to update this product.' };
  }

  return await updateProductDescription(productId, description);
}


const reduceProductQuantity = async (productId, quantity) => {
  const product = await findProductById(productId);
  console.log(product.availableQty)
  if (!product) {
    throw { status: 404, message: 'Product not found' };
  }

  if (product.availableQty < quantity) {
    throw { status: 400, message: 'Insufficient product quantity' };
  }

  product.availableQty -= quantity;
  
  await product.save();

  return product;
}

module.exports = {
  getProductsServices,
  registerProductServices,
  updateProductServices,
  reduceProductQuantity
}