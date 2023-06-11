const { check } = require('express-validator')
const validateResult = require('../utils/validate')

const createUserValidator = [
  check("username", "Error with the username attribute")
    .exists()
    .withMessage("The username is not being sent")
    .notEmpty()
    .withMessage("Username should not be empty")
    .isString()
    .withMessage("The data type must be a string")
    .isLength({ min: 6, max: 30 })
    .withMessage("The username must be between 6 and 30 characters long")
    .trim(),
  check("email", "Error with the email field")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email field cannot be empty")
    .isString()
    .withMessage("Email should be a string")
    .isEmail()
    .withMessage("Email should be a valid email address")
    .isLength({min: 10, max: 50})
    .withMessage("Email should be between 10 and 50 characters long")
    .trim(),
  check("password", "Error with the password field")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password field cannot be empty")
    .isString()
    .withMessage("Password should be a string")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  validateResult
]

const loginValidator = [
  check("email", "Error with the email field")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email field cannot be empty")
    .isEmail()
    .withMessage("Email should be a valid email address")
    .isLength({ min: 10, max: 50 })
    .withMessage("Email should be between 10 and 50 characters long")
    .trim(),
  check("password", "Error with the password field")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password field cannot be empty")
    .isString()
    .withMessage("Password should be a string")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
    validateResult
]

const emailVerificationValidator = [
  check("email", "Error with the email field")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email field cannot be empty")
    .isString()
    .withMessage("Email should be a string")
    .isEmail()
    .withMessage("Email should be a valid email address")
    .isLength({min: 10, max: 50})
    .withMessage("Email should be between 10 and 50 characters long")
    .trim(),
    validateResult
]

const resetPasswordValidator = [
  check("newPassword", "Error with the newPassword field")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password field cannot be empty")
    .isString()
    .withMessage("Password should be a string")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  validateResult
]

module.exports = {
  createUserValidator,
  loginValidator,
  emailVerificationValidator,
  resetPasswordValidator
}