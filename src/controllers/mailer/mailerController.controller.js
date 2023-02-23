const dotenv = require('dotenv')
dotenv.config()

class MailerController {
    #mailerService
    
    constructor(mailerService) {
        this.#mailerService = mailerService
    }

    async send(req, res, next) {
        try {
            const { subject, text } = req.body
            
            console.log(this)

            const transporter = await this.#mailerService.createTransporter(
                process.env.SMTP_CONFIG,
                process.env.SMTP_USER,
                process.env.SMTP_PASSWORD
            )

            const resultMail = await transporter.sendMail(
                process.env.MAILER_USER, 
                process.env.MAILER_USER, 
                subject, 
                text
            )
    
            req.HTTP_STATUS = 200
            req.RES_STATUS = true
            req.content = resultMail
            req.message = 'Email enviado com sucesso'
        } catch (error) {
            console.log(error)
            
            req.HTTP_STATUS = 500
            req.RES_STATUS = false
            req.message = 'Houve um erro ao enviar email'
        }

        next()
    }
}

// router.post('/email', async (req, res) => {
//     try {
//         const { subject, text } = req.body

//         const mailer = new Mailer(nodemailer)

//         const transporter = mailer.createTransporter(
//             "gmail",
//             process.env.MAILER_USER,
//             process.env.MAILER_PASSWORD
//         )

//         const mail = await transporter.sendMail(
//             process.env.MAILER_USER,
//             process.env.MAILER_USER,
//             subject,
//             text   
//         )

//         console.log(mail)

//         res.status(200).send({ status: true, message: 'Email enviado com sucesso!' })
//     } catch (error) {
//         res.status(500).send({ status: false, message: 'Erro ao enviar email.', error })
//     }
// })

module.exports = MailerController