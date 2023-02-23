const nodemailer = require('nodemailer')

const MailerController = require('../../controllers/mailer/mailerController.controller')
const MailerService = require('../../services/mailer/mailerService.service')

const mailerService = new MailerService(nodemailer)
const mailerController = new MailerController(mailerService)

module.exports = mailerController