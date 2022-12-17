const sendError = (res, data, message = "") => {
    return res.json({
        status: false,
        message,
        data,
    });
}

const sendSuccess = (res, data, message = "") => {
    return res.json({
        status: true,
        message,
        data,
    });
}

module.exports = {sendError,sendSuccess}
