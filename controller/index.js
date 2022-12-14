const mongoose = require("mongoose")
const UserMOdel = require("../model.js/index")
const followModel = require("../model.js/followers")
const bcrpty = require("bcryptjs")
const { ObjectId } = require("mongodb")
const jwt = require("jsonwebtoken")
const https = require("http-status")
const { findOne } = require("../model.js/index")
const response = require("../util/response")
const httpStatus = require("http-status")
const auth = require("../middleware/jwt")
require("dotenv").config()



const singnup = async (req,res) =>{
    try{
        const salt = await bcrpty.genSalt(10)
        const hashPassowrd =await bcrpty.hash(req.body.Password,salt)
        // const {data} = req.body
        console.log("___________________________________",req.body)
        const data = new UserMOdel({
            FirstName:req.body.FirstName,
            Email:req.body.Email,
            Password:hashPassowrd

        })
        // const private = '41f049987e61f29e1bdfa5af64904ab80420af97c6f54411f29cb5df3f895f04'
        // const param = {
        //     FirstName:req.body.FirstName,
        //     Email:req.body.Email,
        //     Password:hashPassowrd
        // }
        // const token = jwt.sign(param, private)
    // const NewUser =  await commonQueries.createNewUser(UserMOdel,data)
    const NewUser = await data.save()
    const CreateToken = auth.createJwtTOken({
        _id:NewUser._id,
        Email:NewUser.Email,
        expires_in: process.env.TOKEN_EXPIRES_IN,
    })
    console.log("oihfwuedhefiuwe", NewUser)
    if(!NewUser) {
        return res.json("user Not created" )
    }
    const result = res.json({userRegister:NewUser,token:CreateToken})
    return result
    }catch(err){
        console.log("error..........", err)
        return err
    }
}
const getUserInformation = async(req,res) =>{
  try{  const {id} = req.query 
    console.log("+++++++++++++++++++",id)
    const getUserDetial = await UserMOdel.findOne({_id:ObjectId(id)})
    console.log("kk",getUserDetial)
    return res.json({detial: getUserDetial})}
    catch(error){
        return error
    }
}
const updateUser = async(req,res) =>{
    try{
        let {FirstName, Email} = req.body
        console.log("7890---------------",FirstName,req.body)
        const updateUser = await UserMOdel.updateOne({_id:ObjectId(req.query.id)},
        {
            $set:{FirstName,Email}
        })
        console.log("-----------------------",updateUser)
        if(!updateUser){
            return res.json("user not update")
        }
        return res.json({detail: updateUser})
    }catch(error){
        return error
    }
}
const deleteUser = async(req,res) =>{
    try{
        let {_id} = req.body
        const deleteUser = await UserMOdel.deleteOne({_id:ObjectId(req.query.id)})
        if(!deleteUser){
            return res.json("unable to delete")
        }
        return res.json({userDetail:deleteUser})
    }
    catch(error){
        return error
    }
}
const login = async (req,res) =>{
    try{
        let {Email, Password} = req.body
        const userFind  = await UserMOdel.findOne({Email:Email})
        console.log("userFind", userFind)
        if(!userFind){
            return res.status(https.BAD_REQUEST).json("PLease Login first")
        }
        console.log("user_userFind",userFind)
        const passwordMatch = bcrpty.compare(Password,userFind.Password)

        const private = '41f049987e61f29e1bdfa5af64904ab80420af97c6f54411f29cb5df3f895f04'
        const param = {
            _id:userFind._id,
            FirstName:userFind.FirstName,
            Email:userFind.Email,
        }
        const token = jwt.sign(param, private)
        res.status(200).json({Message: "Login Successfully", token:token})
    }catch(error){
        return error
    }
}
const followOtherUser = async(req, res) =>{
    try{
        console.log("weeeeee",req.data)
        const followers = await UserMOdel.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.data._id}
        },{new:true})
        if(!followers){
            return response.error({msgCode:"FOLLOW"}, res, httpStatus.BAD_REQUEST)
        }
        const following = await UserMOdel.findByIdAndUpdate(req.data._id, {
            $push:{following:req.body.followId}
        },{new:true})
        if(!followers){
            return response.error({msgCode:"FOLLOW"}, res, httpStatus.BAD_REQUEST)
        }
        return res.status(201).json({message:"follow successfully"})
    }catch(error){
        console.log("error",error)
        return res.status(500).json({error})
    }
}
const isEmailExist = async (req, res, next) => {
    try {
  
      const { Email } = req.body;
    //   const condition = { email: email.toLowerCase() };
      const checkUserExist = await UserMOdel.findOne({Email:Email})
      console.log("🚀 ~ file: controller.js ~ line 415 ~ isEmailExist ~ condition",checkUserExist)
      if (!checkUserExist) {
        return next();
      }
      else{
        
      return response.error({ msgCode: 'ALREADY_REGISTERED' }, res, httpStatus.CONFLICT);
      }
    }
    catch (err) {
        console.log("error",err)
      return response.error({ msgCode: 'INTERNAL_SERVER_ERROR' }, res, httpStatus.INTERNAL_SERVER_ERROR);
    }
  };
module.exports = {
    singnup,
    getUserInformation,
    updateUser,
    deleteUser,
    login,
    followOtherUser,
    isEmailExist
}