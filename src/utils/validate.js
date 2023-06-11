const { validationResult } = require('express-validator')

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    next({
      status: 400,
      error: 'validate error', 
      message: error.errors.map(err => err.msg)
    })
  }
}

module.exports = validateResult