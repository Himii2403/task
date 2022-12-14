const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const userController = require("./routers/index")
require("dotenv").config()
require("./middleware/database")
const app = express()


app.use(express.json())

app.use("/api", userController)


app.listen(process.env.Port, () =>{
    console.log("server..................")
})
