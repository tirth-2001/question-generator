const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// Import Router
const questionRoutes = require('./controller/v1/question')

// global midlware
app.use(cors())
app.use(bodyParser.json())

// Health check routes
app.get('/ping', (_, res) => {
    return res.send('pong')
})

// My Routes
app.use('/api/v1', questionRoutes)

// Swagger Docs UI
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.PORT || 8080

app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
        return res.status(500).send(err.message)
    } else {
        console.log('[INFO] Server Running on port:', port)
    }
})