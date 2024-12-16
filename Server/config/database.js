const mongoose = require("mongoose")
require("dotenv").config()

const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Connected to StudyNotion database"))
    .catch((err)=>{
        console.error(err)
        console.log("Error connecting to MongoDB")
        process.exit(1)
    })
}

module.exports = connect;