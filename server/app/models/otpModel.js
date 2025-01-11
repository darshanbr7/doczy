import { Schema, model } from "mongoose";
/**
 * OTP Schema for storing OTP-related data in the database.
 * This Mongoose schema defines the structure of the OTP (One-Time Password) document. The OTP document is used for managing 
 * Fields:
 * - `userId`: The user associated with the OTP, referenced from the "User" model. This field is required.
 * - `otp`: The one-time password that is generated and sent to the user. This field is a number.
 * - `retryCounts`: The number of attempts the user can make to verify the OTP. It is set to a default value of 3 and is required.
 * - `expireAt`: The expiration time for the OTP. This field determines when the OTP is no longer valid.
 * - `timestamps`: Automatically adds `createdAt` and `updatedAt` fields to the document.
 * The model is named "OTP", and it will be used for interacting with OTP-related data in the database.
 * @module OTP
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