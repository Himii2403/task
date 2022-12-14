const { validate } = require('../middleware/validator');
const {verifyToken } = require("../middleware/jwt")

module.exports = {
    validate,
    verifyToken
}