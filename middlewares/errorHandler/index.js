const { errorCodeMessage } = require('../../constant/errorMessage');

const errorHandler = (err, req, res) => {
    console.log('Middleware Error Hadnling');
    const errObj = errorCodeMessage[err.errorCode];
    const errStatus = errObj != null ? errObj.statusCode : 500;
    const errMsg = errObj != null ? errObj.message : 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        errCode: err.errorCode == null ? '0000' : err.errorCode,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? err.stack : {},
    });
};

module.exports = errorHandler;
