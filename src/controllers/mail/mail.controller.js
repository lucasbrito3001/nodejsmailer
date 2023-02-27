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
            
            const transporter = await this.#mailerService.createTransporter(
                process.env.MAILER_SMTP_HOST,
                process.env.MAILER_SMTP_PORT,
                process.env.NODE_ENV === 'production',
                process.env.MAILER_USER,
                process.env.MAILER_PASSWORD
            )
            
            if(transporter.status === false) throw new Error(transporter.error)

            const resultMail = await transporter.sendMail(
                process.env.MAILER_USER, 
                process.env.MAILER_USER, 
                subject, 
                text
            )
                
            if(resultMail.status === false) throw new Error(resultMail.error)
    
            req.HTTP_STATUS_CODE = 200
            req.STATUS_BOOLEAN = true
            req.content = resultMail
            req.message = 'Email enviado com sucesso'
        } catch (error) {
            console.log(error.message)
            
            req.HTTP_STATUS_CODE = 500
            req.STATUS_BOOLEAN = false
            req.message = 'Houve um erro ao enviar email'
            req.error = error
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