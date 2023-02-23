class Response {
    createResponseStructure({
        STATUS_BOOLEAN,
        message,
        content,
        error
    }) {
        return {
            status: STATUS_BOOLEAN,
            message,
            ...(content && { content }),
            ...(error && { error })
        }
    }
}

module.exports = Response