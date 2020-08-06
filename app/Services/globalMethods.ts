const globalMethods = {
    returnResponse(messageSelected, statusSelected, response, objectSelected?) {
        return response.json({
            status: statusSelected,
            message: messageSelected,
            data: objectSelected,
        })
    }
}

export default globalMethods