const User = require("../models/User")
const Otp = require("../models/Otp")
const Profile = require("../models/Profile")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const {passwordUpdated} = require("../mail/templates/passwordUpdate")
require("dotenv").config()


//**************************************************************
//                  signup --for registering users
//**************************************************************
exports.signUp = async(req, res) => {
    try{
        const {
            firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword, 
            accountType,
            otp
        } = req.body
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success : false,
                message : "Please fill all the fields"
            })
        }
       
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message : "Password and Confirm Password do not match"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const recentOtp = await Otp.find({email}).sort({createdAt : -1}).limit(1)
        console.log("Recent otp : ", recentOtp);
        
        if(recentOtp.length === 0 || recentOtp[0].otp !== otp){
            return res.status(400).json({
                success : false,
                message : "Invalid Otp"
            })
        } 
        
        let hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
		let approved = accountType === "Instructor" ? false : true;

        //additional detail for user 
        const profileDetail = await Profile.create({
            gender : null, 
            dateOfBirth : null, 
            about : null, 
            contactNumber : null
        })

        const newUser = await User.create({
            firstName, 
            lastName, 
            email, 
            password : hashedPassword, 
            accountType : accountType, 
			approved: approved,
            additionalDetails : profileDetail._id,
            image : `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success : true,
            message : "User created successfully",
            userData : newUser
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "User cannot be registered, please check details"
        })
    }
}


//**************************************************************
//                  OTP send for email verification
//**************************************************************
exports.sendOtp = async(req, res) => {
    try{
        const {email} = req.body
        const checkUserPresent = await User.findOne({email})
        
        if(checkUserPresent) {
            res.status(401).json({
                success : false,
                message : `User already registered`
            })
        }

        var otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            lowerCaseAlphabets : false,
            specialChars: false
        })
        console.log("OTP generated :", otp);
        //check unique otp 
        const result = await Otp.findOne({otp : otp})
        console.log("Result OTP  :", result);

        //jab tak check ho raha hai ki otp unique hai ya nahi till that generate new otps
        while(result){
            otp = otpGenerator.generate(6, { 
                upperCaseAlphabets: false, 
            });
            // result = await Otp.findOne({otp : otp}) //bar bar check karega db ke saath ki otp unique hai ya nehi 
        }

        const otpPayload = {email, otp}
      
        const otpBody = await Otp.create(otpPayload)
        console.log("otp Body", otpBody);
        
        res.status(200).json({
            success : true,
            message : `Otp sent successfully`,
            otp
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//**************************************************************
//                  Login--for authenticating users
//**************************************************************
exports.logIn = async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "Please enter email and password"
            })
        }
        
        // Find user with provided email
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User is not registered"
            })
        }
        
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                id : user._id,
                email : user.email,
                accountType : user.accountType
            }
            
            let jwtToken = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn : "24h"
            });
          
            user.jwtToken = jwtToken
            user.password = undefined;

            //set cookie for token and send response
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            }
            res.cookie("token", jwtToken, options).status(200).json({
                success : true,
                jwtToken,
                user,
                message : "User logged in successfully",
            })
        }else{
            return res.status(401).json({
                success : false,
                message : "Incorrect password"
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Login Error, please try again"
        })

    }
}


//**************************************************************
//                  Change or UPDATE password
//**************************************************************
exports.changePassword = async(req, res) => {
    try {
		const userDetails = await User.findById(req.user.id);
		const { currentPassword, newPassword } = req.body;

		const isPasswordMatch = await bcrypt.compare(currentPassword, userDetails.password);
		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect.." });
		}


		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "Password for your account has been updated",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);

		} catch (error) {
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		return res.status(200).json({
            success: true, 
            message: "Password updated successfully" 
        });

	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}

}
