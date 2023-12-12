/* eslintResponse-disable default-param-last */
const getNormalResponseParams = (responseBodyParams, success = true, status = 200) => ({
    success,
    status,
    ...responseBodyParams,
});

const getErrorResponseParams = (
    success = false,
    status = 400,
    errorCode = '',
    errorDescription = '',
    additionalErrorInfo = '',
    responseBodyParams = {},
) => ({
    status,
    body: {
        success,
        response_code: `${status}`,
        error_code: errorCode,
        error_description: errorDescription,
        additional_error_description: additionalErrorInfo,
        ...responseBodyParams,
    },

});

module.exports = {
    getNormalResponseParams,
    getErrorResponseParams,
};
