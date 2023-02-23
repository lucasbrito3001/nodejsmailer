const { Router } = require('express')
const router = Router()

const mailerFactory = require('../../factories/mailer/mailer.factory')

router.post('/', mailerFactory.send.bind(mailerFactory))

module.exports = router