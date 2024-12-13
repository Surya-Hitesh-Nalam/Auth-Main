import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeMail } from "../mailtrap/emails.js";

export const signup = async(req,res)=>{
    const {email,password,name}=req.body;
    try {
        if(!email||!password||!name){
            throw new Error("All feilds required")
        }

        const userALreadyExists=await User.findOne({email})
        if(userALreadyExists){
            return res.status(400).json({success:false,message:"user already exisists"})
        }
        
        const hashedPassword = await bcryptjs.hash(password,12);
        const verificationToken = generateVerificationCode()
        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpireAt:Date.now()+24*60*60*1000
        })
        await user.save();

        //jwt 
        generateTokenAndSetCookie(res,user._id)

        await sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({
            success:true,
            message:"user created successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

export const verifyEmail = async(req,res)=>{
    const {code} = req.body;
    try {
        const user= await User.findOne({
            verificationToken:code,
            verificationTokenExpireAt:{$gt:Date.now()}
        })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired verification code"
            })
        }

        user.isVerified= true;
        user.verificationToken=undefined;
        user.verificationTokenExpireAt=undefined;
        await user.save();

        await sendWelcomeMail(user.email,user.name) 

        res.status(200).json({
            success:true,
            message:"Email Verified Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        console.log("error in verify email")
        res.status(500).json({success:false,message:"server error"})
    }
}

export const login = async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        const isPasswordValid = await bcryptjs.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:"Invalid Credentials"})
        }

        generateTokenAndSetCookie(res,user._id)

        user.lastLogin= new Date();
        await user.save();
        res.status(200).json({
            success:true,
            message:"loged in success",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        console.log("error in login function")
        res.status(400).json({success:false,message:"error in sign in"})
    }

}

export const logout=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true,message:"user logout success"})

}

export const forgotPassword= async(req,res)=>{
    const {email}=req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"user not found"})
        }
        //Generate Reset Token

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt= Date.now()+1*60*60*1000;

        user.resetPasswordToken= resetToken;
        user.resetPasswordExpireAt=resetTokenExpiresAt;

        await user.save()

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({success:true,message:"password reset mail sent successful"})
    } catch (error) {
        console.log("error in forgot password",error)
        res.status(400).json({success:false,message:error.message})
    }
}

export const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params;
        const {password}=req.body;

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpireAt:{$gt:Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false,message:"Invalid or expired reset token"})
        }
        const hashedPassword=await bcryptjs.hash(password,12)

        user.password=hashedPassword
        user.resetPasswordToken=undefined
        user.resetPasswordExpireAt=undefined
        await user.save()

        await sendResetSuccessEmail(user.email)
        res.status(200).json({success:true,message:"password reset mail sent successful"})
    } catch (error) {
        console.log("error in reset password")
        res.status(400).json({success:false,message:error.message})
    }
}

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};