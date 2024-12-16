const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")

//auth
exports.auth = async(req, res, next) => {
    try {
        const token = req.cookies.token 
                        || req.body.token 
                            || req.header('Authorization').replace('Bearer ', '');
        if(!token){
            return res.status(401).json({
                success : false,
                message: "Access denied. No token provided."});
        }

        try{
            const payload = jwt.verify(token, process.env.SECRET_KEY)
            console.log("Payload is : ", payload)
            req.user = payload
        }catch(error){
            return res.status(401).json({
                success : false, 
                message : "Token is invalid"
            })
        }

        next();

    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Unauthorized, Something went wrong"})
    }
}

//isStudent
exports.isStudent = async(req, res, next) => {
    try{
        console.log("Printing AccountType ", req.user.accountType);
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for student"
            })
        }
        next();

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified"
        })

    }
}

//isInstructor
exports.isInstructor = async(req, res, next) => {
    try{
        console.log("Printing AccountType ", req.user.accountType);
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Instructor"
            })
        }
        next();

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified"
        })

    }
}

//isAdmin
exports.isAdmin = async(req, res, next) => {
    try{
        console.log("Printing AccountType:- ", req.user.accountType);
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Admin"
            })
        }
        next();
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified"
        })

    }
}