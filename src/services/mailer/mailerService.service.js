class Mailer {
    #mailerModule

    constructor(mailerModule) {
        this.#mailerModule = mailerModule
    }

    createTransporter(smtpService, user, pass) {
        try {
            const transporter = this.#mailerModule.createTransport({
                service: smtpService,
                auth: { user, pass },
                tls: { rejectUnauthorized: false }
            })
    
            async function sendMail(from, to, subject, text) {
                try {
                    await transporter.sendMail({ from, to, subject, text })

                    return { status: true, content: { from, to, subject, text } }
                } catch (error) {
                    return { status: false, error: error.message }
                }
            }
            
            return { sendMail }
        } catch (error) {
            return { status: false, error: error.message }
        }
    }
}

module.exports = Mailer