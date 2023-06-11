const { check } = require('express-validator')
const validateResult = require('../utils/validate')

const updateProductDescValidator = [
  check("description", "Error with the description attribute")
    .exists()
    .withMessage("The description is not being sent")
    .notEmpty()
    .withMessage("description should not be empty")
    .isString()
    .withMessage("The data type must be a string")
    .isLength({ min: 10 })
    .withMessage("The description must be a minimum of 10 characters.")
    .trim(),
    validateResult
]

module.exports = {
  updateProductDescValidator
}