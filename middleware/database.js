const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://fusion:CUbGtCdT7UKl6GbA@cluster0.enkm0qv.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true,
useUnifiedTopology: true,})
.then((result) =>{console.log("database connect...")})
.catch((err) =>{console.log(err)})

module.exports = mongoose