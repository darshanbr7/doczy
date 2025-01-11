import twilio from "twilio"
import _ from "lodash";
import nodemailer from "nodemailer";
import OTP from "../models/otpModel.js";
import checkCollection from "../helpers/userControllerHelpers/checkCollection.js";
import generateOtp from "../helpers/userControllerHelpers/checkOtpCollection.js";
import generateToken from "../helpers/userControllerHelpers/generateToken.js";
import { OTP_EMAIL_TEMPLATE } from "../helpers/userControllerHelpers/mailTemplets.js"; 
const otpController = {}
/**
 *This function helps to Send a SMS OTP to the user for authentication purposes.
 * This function handles the process of sending an OTP via SMS to a user's phone number for verifying their identity. 
 * It performs the following steps:
 * 1. Retrieves the phone number from the request body using lodash.
 * 2. Checks if the provided phone number exists in the user database; if not, it returns a 400 error indicating the phone number is not registered.
 * 3. Initializes the Twilio client using the account SID and authentication token from environment variables.
 * 4. Generates an OTP for the user using the `generateOtp` function.
 * 5. Prepares the message content to be sent to the user's phone number using Twilio.
 * 6. Sends the OTP via SMS to the specified phone number using Twilio's messaging service.
 * 7. Returns a success message upon successfully sending the OTP.
 * 8. In case of any error during the process, logs the error and returns a 500 error with a generic error message.
 * @param {Object} req - The request object containing the user's phone number.
 * @param {Object} res - The response object to send back the result (either success or error message).
 * @returns {Object} - A JSON response indicating the result of the OTP sending process.
*/
otpController.sendSmsOtp = async ( req, res ) => {
    try {
        const { phoneNumber } = _.pick ( req.body, [ "phoneNumber"] );
        const user = await checkCollection( { phoneNumber : phoneNumber } );
        if( !user ) {
            return res.status( 400 ).json ( { error : "Phone Number is not Registered " } );
        }
        const accountSid =  process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio( accountSid, authToken );
        const { otp } = await generateOtp( user._id );
        const messageOptions = {
            from : process.env.TWILIO_FROM_NUMBER,
            to :  `+91${ phoneNumber }`,
            body : `Your One-Time-Password( OTP ) for the DOCZY Application login is ${ otp }`
        }
        await client.messages.create( messageOptions );
        res.json(  {  message  : "OTP sent succesfully" } );
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json ( { error : "Something went wrong! "})
    }
}

/**
 * This function handles the process of sending an OTP via email to a user for verifying their identity. 
 * The function performs the following steps:
 * 1. Retrieves the user's email from the request body using loadsh.
 * 2. Checks if the email exists in the user database; if not, it returns a 401 error indicating the email is not registered.
 * 3. Generates an OTP for the user using the `generateOtp` function.
 * 4. Configures a nodemailer transporter to send the OTP email via a Gmail account, using credentials stored in environment variables.
 * 5. Prepares the email content, including the OTP, using a pre-defined email template.
 * 6. Sends the OTP email to the specified email address.
 * 7. If the email is sent successfully, it returns a success message.
 * 8. In case of any error during the process (e.g., email sending failure or configuration issue) returns a 500 error with a generic message.
 * @param {Object} req - The request object containing the user's email.
 * @param {Object} res - The response object to send back the result (either success or error message).
 * @returns {Object} - A JSON response indicating the result of the OTP sending process.
*/
otpController.sendEmailOtp = async ( req, res ) => {
    try {
        const { email } = _.pick( req.body, [ "email" ] );
        const user = await checkCollection( { email : email } );
        if( !user ){
            return res.status( 401 ).json( { error : "Email is not registered "})
        }
        const { otp } = await generateOtp( user._id );
        const transporter =   nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.ADMIN_EMAIL,
                pass : process.env.ADMIN_PASS
            }
        })
        let mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email, 
            subject: " OTP code for Login ", 
            html : OTP_EMAIL_TEMPLATE.replace( "{verificationCode}", otp )
        };
        const info = await transporter.sendMail(mailOptions)
        if( !info ){
            throw new Error ( "something went wrong in mail config")
        }
        res.status( 201 ).json({  message   : "OTP sent succesfully "});
    } catch (error) {
        res.status( 500 ).json( { error : "Something went wrong! "});
    }
}

/**
 * This function verifies the OTP entered by the user during the login process.
 * This function handles the OTP verification process. It performs the following steps:
 * 1. Retrieves the user's email or phone number and OTP from the request body using lodash.
 * 2. Ensures that either the phone number or email is provided; if neither is present, it returns a 400 error.
 * 3. Searches for the user in the database using the provided phone number or email.
 * 4. Retrieves the OTP record associated with the users' id.
 * 5. Checks if the OTP record exists for the user and if the OTP retry count is greater than 0; if not, returns an error message.
 * 6. Compares the provided OTP with the stored OTP. If the OTP is correct:
    - Generates a JWT token for the user and returns it in the response.
 * 7. If the OTP is incorrect, decreases the retry count and returns an error message indicating the invalid OTP.
 * 8. Checks if the OTP has expired based on the expiration timestamp; if expired, it returns an error message.
 * 9. In case of any errors during the process (e.g., database or validation issues) returns a 500 error with a generic error message.
 * @param {Object} req - The request object containing the user's email or phone number and OTP.
 * @param {Object} res - The response object to send back the result (either success or error message).
 * @returns {Object} - A JSON response containing either a generated token or an error message.
*/
otpController.verifyOtp =  async ( req, res ) => {
    try {
        const { email, phoneNumber, otp } = _.pick( req.body , [ "email", "phoneNumber", "otp" ] );
        if ( !(phoneNumber || email) ) {
            return res.status( 400 ).json( { error : "Phone Number / email required " } );
        }
        const  user = await checkCollection ( phoneNumber ? { phoneNumber }: {email} );
        const getOtp = await OTP.findOne( { userId : user._id } );
        if( !user  || !getOtp ) {
            throw new Error ( "OTP not found for this user")
        }
        if( getOtp.retryCounts ===  0 ){
            return res.status( 400 ).json( { error : "Exceded the attempts for login try after some time" } );
        }
        const currentTime = new Date();
        if( currentTime > getOtp.expireAt ){
            return res.status( 400 ).json ( { error : "OTP has expired"})
        }
        if( getOtp.otp == otp ) {
            const token = await generateToken ( user );
            return res.json( { token : `Bearer ${ token }`} );   
        } else {
            const newCount  = {
                retryCounts  : getOtp.retryCounts - 1
            }
            const  updateCount = await OTP.findOneAndUpdate( { userId:  user.id}, newCount , { new : true } );
            console.log( updateCount );
            return res.status( 400 ).json( { error : "Invalid OTP try again "})
        }

    } catch (error) {
        console.log( error )
        res.status( 500 ).json ( { error : "Something went wrong! "})
    }
}


export default otpController;