const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const mailerRoutes = require('./routes/mail/mail.routes')

const responseFactory = require('./factories/response/response.factory')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan())

app.get('/', (req, res) => {
    res.send('Hello world, nodejsmailer from Lucas de Brito')
})

app.use('/email', mailerRoutes)

app.use(responseFactory.send.bind(responseFactory))

module.exports = app