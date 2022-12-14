const jwt = require('jsonwebtoken')
const response = require('../util/response')
const httpStatus = require('http-status')
const { model } = require('mongoose')
const userModel = require("../model.js/index")
const secretKey = '41f049987e61f29e1bdfa5af64904ab80420af97c6f54411f29cb5df3f895f04'


const generateAuthJwt = (payload) => {
    console.log("🚀 ~ file: auth.js ~ line 11 ~ generateAuthJwt ~ payload", payload)
    const { expires_in, ...params } = payload;
    const token = jwt.sign(params, secretKey, { expiresIn: expires_in });
    if (!token) {
        return false;
    }
    return token;
};
const createJwtTOken = (payload) =>{
 const {expires_in, ...params} = payload
 const token = jwt.sign(params,secretKey,{expiresIn:expires_in})
 if(!token) {
    return false
 }
 return token
}
const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.token
        if (!token) {
            return response.error({ msgCode: 'MISSING_TOKEN' }, res, httpStatus.UNAUTHORIZED);
        }
        jwt.verify(token, secretKey, async (error, decoded) => {
            // console.log('errrrrrrrrrrr',error.message);
            if (error) {
                let msgCode="INVALID_TOKEN"
                if(error.message==constant.error_msg.EXPIRED){
                    msgCode='TOKEN_EXPIRED'
                }
                return response.error( {msgCode} , res, httpStatus.UNAUTHORIZED)
            }
                req.data = decoded;
                console.log('decode',decoded);
            return next();
        })
    } catch (err) {
        console.log("errrrrrr",err)
        return response.error({ msgCode: 'INTERNAL_SERVER_ERROR' }, res, httpStatus.INTERNAL_SERVER_ERROR)

    }
}




module.exports = {
    createJwtTOken,
    verifyToken
}