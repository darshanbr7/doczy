import bcryptjs from "bcryptjs"
import _ from  "lodash";
import twilio  from "twilio";

import User from "../models/userModel.js"
import checkCollection from "../helpers/checkCollection.js";
import generateToken from "../helpers/generateToken.js";
import generateRandomNumber from "../helpers/generateRandomNo.js";

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
        const {  email, password }  = _.pick ( req.body, [ "email", "password" ] ); 
        const  user = await checkCollection ( { email :  email });
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
        const { phoneNumber } = _.pick ( req.body, [ "phoneNumber" ] );
        const user = await checkCollection( { phoneNumber : phoneNumber } );
        if( !user ) {
            return res.status( 400 ).json ( { error : "Phone Number is not Registered " } );
        }
        const accountSid =  process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio( accountSid, authToken );
        const randomNo =  generateRandomNumber();
        const messageOptions = {
            from : process.env.TWILIO_FROM_NUMBER,
            to :  "+1",phoneNumber ,
            body : `Your One-Time-Password( OTP ) for the DOCZY Application login is ${ randomNo }`
        }
        const message = await client.messages.create( messageOptions );
        res.json( message );
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json ( { error : "Something went wrong! "})
    }
}

export default userController;