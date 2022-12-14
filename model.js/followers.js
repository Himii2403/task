const mongoose = require("mongoose")

const followers = mongoose.Schema({
    following:{
        type:String
    },
    followers:{
        try:Number
    }
},{timeStamps:true})

const UserDetail = mongoose.model("followers", followers)
module.exports = UserDetail