class Response {
    #responseService

    constructor(responseService) {
        this.#responseService = responseService;
    }

    send(req, res) {
        const responseStructure = this.#responseService.createResponseStructure(req)

        console.log(responseStructure)

        res.status(req.HTTP_STATUS_CODE).json(responseStructure)
    }
}

module.exports = Response