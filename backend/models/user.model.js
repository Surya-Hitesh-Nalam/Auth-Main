import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role: { type: String, enum: ['jobSeeker', 'recruiter'], default: 'jobSeeker' },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOrginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId , ref:'Company'},
        profilePhoto:{
            type:String,
            default:''
        }
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpireAt:Date,
    verificationToken:String,
    verificationTokenExpireAt:Date
},{timestamps:true});

const User = mongoose.model('User',userSchema)

export default User