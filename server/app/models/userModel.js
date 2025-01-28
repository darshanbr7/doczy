import { model, Schema } from "mongoose";
/**
 * User Schema for storing user-related information in the database.
 * It includes fields for user credentials, verification, subscription status, and password reset functionality.
*/
const userSchema = new Schema({
    name : String,
    email : String,
    password : String,
    phoneNumber : String,
    role:{
        type : String,
        enum :[ "admin", "doctor", "customer" ],
        required: true 
    },
    isVerified : {
        type : Boolean,
        default : false
    }
}, { timestamps : true } );
const User = model( "User", userSchema );

export default User;