const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const mailTransporter = require('./services/nodemailer')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan())

app.get('/', (req, res) => {
    res.send('Hello world, nodejsmailer from Lucas de Brito')
})

app.post('/email', async (req, res) => {
    try {
        const { subject, text } = req.body

        const result = await mailTransporter.sendMail({
            from: process.env.NODE_MAILER_USER,
            to: process.env.NODE_MAILER_USER,
            subject,
            text
        })

        console.log(result)

        res.status(200).send({ status: true, message: 'Email sucessfully sent.' })
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error sending email', error })
    }
})

module.exports = app