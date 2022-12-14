const Joi = require("joi")



const addUser = Joi.object().keys({
    FirstName: Joi.string().required(),
    Email:Joi.string().required(),
    Password:Joi.string().required(),
})

const follow = Joi.object().keys({
    followId:Joi.string().required(),
})
const login = Joi.object().keys({
    Email:Joi.string().required(),
    Password:Joi.string().required(),
})
module.exports = {
    addUser,
    follow,
    login
}