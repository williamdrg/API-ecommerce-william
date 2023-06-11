const { check } = require('express-validator')
const validateResult = require('../utils/validate')

const cartValidator = [
  check("productId", "Error with the productId attribute")
    .exists()
    .withMessage("The productId is not being sent")
    .notEmpty()
    .withMessage("productId should not be empty")
    .isInt()
    .withMessage("The data type must be a number")
    .trim(),
    check("quantity", "Error with the quantity attribute")
    .exists()
    .withMessage("The quantity is not being sent")
    .notEmpty()
    .withMessage("quantity should not be empty")
    .isInt()
    .withMessage("The data type must be a number")
    .trim(),
    validateResult
]

module.exports = {
 cartValidator
}