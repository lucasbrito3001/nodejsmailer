const { Router } = require('express')
const router = Router()

const mailerFactory = require('../../factories/mail/mail.factory')

router.post('/', mailerFactory.send.bind(mailerFactory))

module.exports = router