import { model, Schema } from "mongoose";
/**
 * User Schema for storing user-related information in the database.
 * It includes fields for user credentials, verification, subscription status, and password reset functionality.
 * Fields:
 * - `name`: The name of the user. This is a string field.
 * - `email`: The email address of the user. This is a string field.
 * - `password`: The hashed password of the user. This is a string field.
 * - `phoneNumber`: The user's phone number. This is a string field.
 * - `role`: The role of the user, which can be "admin", "doctor", or "customer". This field is required and constrained by the `enum` property.
 * - `isSubscriber`: A boolean indicating whether the user is a subscriber. Defaults to `false`.
 * - `isVerified`: A boolean indicating whether the user has been verified. Defaults to `false`.
 * - `timestamps`: Automatically adds `createdAt` and `updatedAt` fields to the document.
 * The model is named "user", and it will be used for interacting with user-related data in the database.
 * @module User
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
    isSubscriber : {
        type : Boolean,
        default: false
    },
    isVerified : {
        type : Boolean,
        default : false
    }
}, { timestamps : true } );
const User = model( "user", userSchema );
export default User;