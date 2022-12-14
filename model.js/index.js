const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const UserSChema = mongoose.Schema({

    FirstName:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    followers:[{
        type:ObjectId,
        ref:"UserDetail"
    }],
    following:[{
        type:ObjectId,
        ref:"UserDetail"
    }],
},{timeStamps:true})

const UserDetail = mongoose.model("UserDetail", UserSChema)
module.exports = UserDetail