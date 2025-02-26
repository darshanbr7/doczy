import { Schema, model } from "mongoose";
/**
 * OTP Schema for storing OTP-related data in the database.
*/
const otpSchema = new Schema ( {
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    otp : Number,
    retryCounts : {
        type : Number,
        default : 3,
        required : true 
    },
    expireAt : Date
}, { timestamps : true });

const OTP = model ( "OTP", otpSchema );

export default OTP;