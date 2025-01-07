import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name : String,
    email : String,
    password : String,
    phoneNumber : String,
    role:{
        enum :[ "admin", "doctor", "user" ]
    },
    isSubscriber : {
        type : Boolean,
        default: false
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : String,
    resetPasswordExpireAt : Date,
    verificationToken : String,
    verificationTokenExpireAt : Date
}, { timestamps : true } );
const User = model( "user", userSchema );
export default User;