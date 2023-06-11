const { Product, User } = require('../models')
const { Op } = require('sequelize')

const getAllAviableProducts = async () => {
  return await Product.findAll({
    where: { availableQty: { [Op.gt]: 0 }},
    include: {
      model: User,
      attributes: ['username']
    }
  })
}

const findProductByName = async (name) => {
  return await Product.findOne({where: { name }})
}

const findProductById = async (productId) => {
  return await Product.findByPk(productId)
}

const createProduct = async (product, image) => {
  return await Product.create({ ...product, productImage: image })
}

const updateProductDescription = async (productId, description) => {
  return await Product.update({ description }, {
    where: {
      id: productId
    }
  });
}

module.exports = {
  getAllAviableProducts,
  createProduct,
  findProductByName,
  findProductById,
  updateProductDescription,
}