import { expect } from 'vitest'
import { describe, test, vi } from 'vitest'
const MailerService = require('./mailerService.service')

const createTransport = vi.fn()
const sendMail = vi.fn()

createTransport
    .mockReturnValueOnce({ sendMail: sendMail.mockReturnValueOnce(true) })
    .mockReturnValueOnce({ sendMail: sendMail.mockImplementation(() => {
        throw new Error('error sending the email')
    }) })
    .mockImplementation(() => {
        throw new Error('error creating the transporter')
    })


const mockNodeMailerModule = {
    createTransport
}

describe('> testing mailer service', () => {
    test('> the email must be sent successfully', async () => {
        const mailerService = new MailerService(mockNodeMailerModule)

        const transporter = mailerService.createTransporter()

        expect(transporter).toHaveProperty('sendMail')

        const email = 'teste@teste.com'
        const emailSubject = 'email subject'
        const emailContent = 'email content'

        const resultSending = await transporter.sendMail(email, email, emailSubject, emailContent)

        expect(resultSending).toStrictEqual({
            status: true, 
            content: {
                from: email,
                to: email,
                subject: emailSubject,
                text: emailContent
            } 
        })
    })

    test('> must be an error sending the email', async () => {
        const mailerService = new MailerService(mockNodeMailerModule)

        const transporter = mailerService.createTransporter()

        expect(transporter).toHaveProperty('sendMail')

        const email = 'teste@teste.com'
        const emailSubject = 'email subject'
        const emailContent = 'email content'

        const mailResult = await transporter.sendMail(email, email, emailSubject, emailContent)

        expect(mailResult).toStrictEqual({ status: false, error: 'error sending the email' })
    })

    test('> must be an error creating the transporter', async () => {
        const mailerService = new MailerService(mockNodeMailerModule)

        const transporter = mailerService.createTransporter()

        expect(transporter).toStrictEqual({ status: false, error: 'error creating the transporter' })
    })
})