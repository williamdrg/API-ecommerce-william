const express = require("express")
require("dotenv").config()
const apiRoutes = require('./routes/index')
const errorRoutes = require('./routes/errors.routes')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

apiRoutes(app)
errorRoutes(app)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})