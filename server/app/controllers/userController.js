import bcryptjs from "bcryptjs"
import _ from  "lodash";
import twilio  from "twilio";
import nodemailer from "nodemailer";

import User from "../models/userModel.js"
import OTP from "../models/otpModel.js";
import checkCollection from "../helpers/checkCollection.js";
import checkOtpCollection from "../helpers/checkOtpCollection.js";
import generateToken from "../helpers/generateToken.js";
import { OTP_EMAIL_TEMPLATE } from "../helpers/mailTemplets.js";

const userController = {}

userController.signUp =  async ( req, res ) => {
    try {
        const { name, email, role, password, phoneNumber }  = _.pick( req.body, [ "name", "email", "password", "role", "phoneNumber"] );
        const user  = new User ( { name, email, phoneNumber, password, role });
        const count =  await User.countDocuments();
        if ( count !== 0 &&  role == "admin" ){
            return res.status( 500 ).json ( { error : "can not able to create an account as a admin"});
        }
        const salt =  await bcryptjs.genSalt();
        const hash = await bcryptjs.hash( password, salt );
        user.password = hash
        user.role == "doctor" ? user.isVerified = false : user.isVerified = true;
        await user.save();
        const body  = _.pick( user, [ "_id", "name", "email", "phoneNumber", "role", "createdAt"] );
        return res.status( 201 ). json( body );
    } catch (error) {
        return res.status( 500 ). json ( { error :  "Something went wrong!"})
    }
}

userController.signIn = async ( req, res ) => {
    try {
        const {  email, password, phoneNumber }  = _.pick ( req.body, [ "email", "password" , "phoneNumber"] ); 
        if ( !(phoneNumber || email) ) {
            return res.status( 400 ).json( { error : "Phone Number / email required " } );
        }
        const  user = await checkCollection ( phoneNumber ? { phoneNumber }: {email} );
        if( ! user ) {
            return res.status( 400 ).json( { error : "Email is not registered "});
        }
        const isValid =  await bcryptjs.compare( password , user.password );
        if( !isValid ){
            return res.status( 400 ).json( { error : "Invalid Email / Password "});
        }
        const token = await generateToken ( user );
        return res.json( { token : `Bearer ${ token }`} );
    } catch (error) {
        return res.status( 500 ).json( { error : "Something went wrong!"})
    }
}

userController.sendSmsOtp = async ( req, res ) => {
    try {
        const { phoneNumber } = _.pick ( req.body, [ "phoneNumber"] );
        const user = await checkCollection( { phoneNumber : phoneNumber } );
        if( !user ) {
            return res.status( 400 ).json ( { error : "Phone Number is not Registered " } );
        }
        const accountSid =  process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio( accountSid, authToken );
        const { otp } = await checkOtpCollection( user._id );
        const messageOptions = {
            from : process.env.TWILIO_FROM_NUMBER,
            to :  `+91${ phoneNumber }`,
            body : `Your One-Time-Password( OTP ) for the DOCZY Application login is ${ otp }`
        }
        await client.messages.create( messageOptions );
        res.json(  { succes : true , message  : "OTP sent succesfully" } );
    } catch (error) {
        console.log( error.message );
        return res.status( 500 ).json ( { error : "Something went wrong! "})
    }
}

userController.sendEmailOtp = async ( req, res ) => {
    try {
        const { email } = _.pick( req.body, [ "email" ] );
        const user = await checkCollection( { email : email } );
        if( !user ){
            return res.status( 401 ).json( { error : "Email is not registered "})
        }
        const { otp } = await checkOtpCollection( user._id );
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

userController.verifyOtp =  async ( req, res ) => {
    try {
        const { email, phoneNumber, otp } = _.pick( req.body , [ "email", "phoneNumber", "otp" ] );
        if ( !(phoneNumber || email) ) {
            return res.status( 400 ).json( { error : "Phone Number / email required " } );
        }
        const  user = await checkCollection ( phoneNumber ? { phoneNumber }: {email} );
        const getOtp = await OTP.findOne( { userId : user._id } );
        if( !user  || !getOtp ) {
            throw new Error ( " OTP not found for this user")
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
        res.status( 500 ).json ( { error : "Something went wrong! "})
    }
}

userController.account =  async ( req, res ) => {
    try {
        res.json( req.currentUser );
    } catch (error) {
        res.status( 500 ).json ( { error : "Something went wrong!"})
    }
}


export default userController;