const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes')
const cartRoutes = require('./cart.routes')
const orderRoutes = require('./order.routes')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../swagger.json')

const apiRoutes = (app) => {
  app.use(userRoutes)
  app.use(productRoutes)
  app.use(cartRoutes)
  app.use(orderRoutes)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

module.exports = apiRoutes