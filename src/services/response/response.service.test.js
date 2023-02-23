import { describe, expect, test } from "vitest";

const ResponseService = require('../../services/response/response.service')
const responseService = new ResponseService()

const mockResponseSuccessWithoutContent = {
    STATUS_BOOLEAN: true,
    message: 'ok'
}

const mockResponseSuccessWithContent = {
    STATUS_BOOLEAN: true,
    message: 'ok',
    content: [1, 2, 3]
}

const mockResponseSuccessWithError = {
    STATUS_BOOLEAN: false,
    message: 'ok',
    error: 'Erro'
}

describe('> testing response service', () => {
    test('> creating the response structure without content successfully', () => {
        const responseStructure = responseService.createResponseStructure(mockResponseSuccessWithoutContent)

        expect(responseStructure).toStrictEqual({ status: true, message: 'ok' })
    })

    test('> creating the response structure with content successfully', () => {
        const responseStructure = responseService.createResponseStructure(mockResponseSuccessWithContent)

        expect(responseStructure).toStrictEqual({ status: true, message: 'ok', content: [1, 2, 3] })
    })
    
    test('> creating the response structure with error successfully', () => {
        const responseStructure = responseService.createResponseStructure(mockResponseSuccessWithError)

        expect(responseStructure).toStrictEqual({ status: false, message: 'ok', error: 'Erro' })
    })
})