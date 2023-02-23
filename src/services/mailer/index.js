const dotenv = require('dotenv')
dotenv.config()

class Mailer {
    #mailerModule

    constructor(mailerModule) {
        this.#mailerModule = mailerModule
    }

    createTransporter(smtpService, user, pass) {
        const transporter = this.#mailerModule.createTransport({
            service: smtpService,
            auth: { user, pass },
            tls: { rejectUnauthorized: false }
        })

        async function sendMail(from, to, subject, text) {
            const mail = await transporter.sendMail({ from, to, subject, text })
            
            return mail
        }
        
        return { sendMail }
    }
}

module.exports = Mailer