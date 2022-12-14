const httpStatus = require('http-status');

const errorMessage = {

    VALIDATION_ERROR: 'Validation error.',
    FOLLOW: 'Error occurs in follow api',
    ALREADY_REGISTERED:"This email is already exit"
    // INTERNAL_SERVER_ERROR
};


exports.success = (result, res, code) => {
    try {
        const response = {
            success: true,
            status_code: code,
            message: successMessage[result.msgCode] || httpStatus[code],
            result: result.data ? result.data : '',
            time: Date.now()
        };

        res.status(code).json(response);
    }
    catch (error) {
        console.log(
            '🚀 ~ file: response.js ~ line 12 ~ exports.success= ~ error',
            error
        );

        return res.json({
            success: true,
            status_code: 500,
            message: 'Internal Server Error.',
            result: '',
            time: Date.now()
        });
    }
};
exports.error = (error, res, code) => {
    try {
        const response = {
            success: false,
            status_code: code,
            message: errorMessage[error.msgCode] || httpStatus[code],
            result: {
                error: error.data ? error.data : 'error'
            },
            time: Date.now()
        };
        res.status(code).json(response);
    }
    catch (err) {
        console.log(
            '🚀 ~ file: response.js ~ line 23 ~ exports.success= ~ err',
            err
        );

        return res.status(500).json({
            success: false,
            status_code: 500,
            message: 'Internal Server error.',
            result: '',
            time: Date.now()
        });
    }
};