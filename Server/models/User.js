const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    // Define the name field with type String, required, and trimmed
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    }, 
    email : {
        type : String,
        required : true,
        trim : true        
    },
    password : {
        type : String,
        required : true,       
    },
   
    accountType : {
        type : String,
        enum : ["Admin", "Student", "Instructor"],
        required : true
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "Profile",
    },
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    ],
    image : {
        type : String,
    },
    jwtToken : {
        type : String,
    },
    resetPasswordExpires : {
        type : Date,
    },
    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "courseProgress"
        }
    ]
},

    // Add timestamps for when the document is created and last modified
{ timestamps: true }
);


module.exports = mongoose.model( "User", userSchema );