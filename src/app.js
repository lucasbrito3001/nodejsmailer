const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const mailerRoutes = require('./routes/mailer/mailerRoutes.routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan())

app.get('/', (req, res) => {
    res.send('Hello world, nodejsmailer from Lucas de Brito')
})

app.use('/email', mailerRoutes)

app.use((req, res) => {
    res.status(req.HTTP_STATUS).json({ status: req.RES_STATUS, content: req.content, message: req.message })
})

module.exports = app