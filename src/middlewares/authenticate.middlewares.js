const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req, res, next) => {
  try {
    // para recuperar el token lo traemos de los headers de la petición
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return next({
        status: 401,
        name: "no token provided",
        message: "You must provide a valid token to access this resource."
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_LOGIN, {
      algorithms: 'HS512'
    })
    /* se toma la información decodificada y la agregamos 
    una propiedad de user en el objeto de la petición con el fin de que 
    esa información pueda ser utilizada en los siguientes middleware */
    req.user = decoded
    next()

  } catch (error) {
    next({
      status: 498,
      name: "invalid o expired token",
      message: error
    })
  }
}

module.exports = authenticate