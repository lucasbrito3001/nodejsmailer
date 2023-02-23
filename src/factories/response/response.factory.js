const ResponseService = require('../../services/response/response.service')
const ResponseMiddleware = require('../../middlewares/response/response.middleware')

const responseService = new ResponseService()
const responseMiddleware = new ResponseMiddleware(responseService)

module.exports = responseMiddleware