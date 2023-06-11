const uploadToCloudinary = require('../utils/uploadFieldCloudinary')
const { getProductsServices, registerProductServices, updateProductServices } = require('../services/product.service')

const getAllProducts = async (req, res, next) => {
  try {
    const products = await getProductsServices() 
    res.status(200).send(products)
  } catch (error) {
    next(error)
  }
};

const createProduct = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { name, description, price, availableQty } = req.body
    const product = { name, description, price, availableQty, userId }

    if (!req.file) {
      throw { status: 400, message: 'No se subió ningún archivo'}
    } 

    const file = req.file
    const uploadResult = await uploadToCloudinary(file.buffer);
    const createProduct = await registerProductServices(product, uploadResult.url)

    res.json({ message: 'Product created successfully', createProduct })
  } catch (error) {
    next(error)
  }
};

const updateProductDescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const userId = req.user.id

    await updateProductServices(userId, id, description);

    res.status(200).json({ message: 'Product description updated successfully.' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  updateProductDescription
}