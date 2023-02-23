const nodemailer = require('nodemailer')

const MailerController = require('../../controllers/mail/mail.controller')
const MailerService = require('../../services/mail/mail.service')

const mailerService = new MailerService(nodemailer)
const mailerController = new MailerController(mailerService)

module.exports = mailerController