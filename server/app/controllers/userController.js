import bcryptjs from "bcryptjs"
import _ from  "lodash";
import User from "../models/userModel.js"
import OTP from "../models/otpModel.js";
import checkCollection from "../helpers/userControllerHelpers/checkCollection.js"
import generateToken from "../helpers/userControllerHelpers/generateToken.js";

const userController = {}
/**
 * This function handles user sign-up process.
 * This function accepts user input from the request body, validates and processes the information, 
    and creates a new user record in the database. It performs the following steps:
 * 1. Extracts necessary fields (name, email, role, password, and phoneNumber) from the request body using lodash .
 * 2. Checks if the user is attempting to create an account with the role 'admin' when there are already existing users (to restrict multiple admins).
 * 3. Hashes the user's password for secure storage.
 * 4. Sets the user's verification status based on the role (unverified for 'doctor', verified for others).
 * 5. Saves the user record to the database.
 * 6. Returns the user details (excluding sensitive data like password) in the response if successful.
 * 7. If any error occurs during the process, an error message is returned with a 500 status code.
 * @param {Object} req - The request object containing user sign-up data.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} - A JSON response containing either the created user data or an error message.
*/
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

/**
 * this function handles user sign-in process.
 * This function accepts user login credentials (email or phone number, and password) from the request body,
 ** performs the following actions:
 * 1. Checks if either email or phone number is provided in the request body; if not, it returns a 400 error.
 * 2. Searches the database for the user using either the phone number or email (depending on the provided input).
 * 3. If no user is found, it returns a 400 error indicating that the email or phone number is not registered.
 * 4. Compares the provided password with the stored password hash using bcryptjs to validate the credentials.
 * 5. If the password is invalid, it returns a 400 error.
 * 6. If the credentials are valid, it generates a JWT token for the user and returns it in the response.
 * 7. In case of any errors during the process, it returns a 500 error with a generic error message.
 * @param {Object} req - The request object containing the user's login credentials (email or phone number, and password).
 * @param {Object} res - The response object to send back the result (JWT token or error message).
 * @returns {Object} - A JSON response containing either the generated token or an error message.
*/
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

/**
 * This function handles the authenticated user's account information.
 * This function returns the user details based on the current authenticated user. 
 * @param {Object} req - The request object, containing `currentUser` set by JWT verification middleware.
 * @param {Object} res - The response object to send back the authenticated user's data.
 * @returns {Object} - A JSON response containing the authenticated user's details.
 */
userController.account =  async ( req, res ) => {
    try {
        const body = _.pick(req.currentUser, ["userId", "role", "name", "isVerified"] )
        res.json( body );
    } catch (error) {
        res.status( 500 ).json ( { error : "Something went wrong!"})
    }
}


export default userController;