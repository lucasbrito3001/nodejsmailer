const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
    // host: process.env.NODE_MAILER_SMTP_HOST,
    // port: process.env.NODE_MAILER_SMTP_PORT,
    // secure: true,
    service: "gmail",
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter