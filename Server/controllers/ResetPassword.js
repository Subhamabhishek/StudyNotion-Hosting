const User = require("../models/User")
const bcrypt = require("bcryptjs");
const mailSender = require("../utils/mailSender")
const crypto = require("crypto");

//****************************************************************************
//          reset password(forgot password) token --> mail send wala kaam
//*****************************************************************************
exports.resetPasswordToken = async (req, res) => {
    try{
      
        const {email} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status.json({
                success : false,
                message : `This Email: ${email} is not Registered With Us Enter a Valid Email `
            })
        }
        //generate token
		const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate({email:email}, 
                                                            {
                                                                jwtToken : token,
                                                                resetPasswordExpires : Date.now() + 3600000
                                                            },
                                                        {new : true})
		console.log("DETAILS :- ", updatedDetails);

        const url = `http://localhost:3000/update-password/${token}`

        //send mail containing url
        await mailSender(
            email, 
            "Reset Password", 
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
        //return response
        return res.json({
            success : true,
            // updatedDetails : updatedDetails,
            message : "Email sent successfully, please check email and reset password"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            error : error.message,
            message : "Error in sending email"
        })
    }
}

//************************************************************
//       reset password--> token --> update new password in db
//************************************************************
exports.resetPassword = async(req, res) => {
    try{
        const {password, confirmPassword, token} = req.body

        if(password !== confirmPassword){
            return res.json({
                success : false,
                message : "Passord and Confirm Password Should be same"
            })
        }
      
        const userdetails = await User.findOne({jwtToken : token})
      
        if(!userdetails){
            return res.json({
                success : false, 
                message : "Invalid Token"

            })
        }

        if(userdetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success : false,
                message : "Token is expired, please regenerate the token"
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        //update password
        await User.findOneAndUpdate({jwtToken : token}, 
            {password : hashedPassword}, 
            {new : true})
        //retrun response
        return res.status(200).json({
            success : true,
            message : "Password reset successfully"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error : error.message,
            success : false,
            message : "Internal server error in reseting password"
        })

    }
}