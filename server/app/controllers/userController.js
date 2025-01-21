import bcryptjs from "bcryptjs"
import _ from  "lodash";
import User from "../models/userModel.js"
import checkCollection from "../helpers/userControllerHelpers/checkCollection.js"
import generateToken from "../helpers/userControllerHelpers/generateToken.js";

const userController = {}
/**
 * This function accepts user input from the request body, validates and processes the information, 
    and creates a new user record in the database
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response containing either the created user data or an error message.
*/
userController.signUp =  async ( req, res ) => {
    try {
        const { name, email, role, password, phoneNumber }  = _.pick( req.body, [ "name", "email", "password", "role", "phoneNumber"] );
        const user  = new User ( { name, email, phoneNumber, password, role });
        const count =  await User.countDocuments();
        if ( count !== 0 &&  role == "admin" ){
            return res.status( 500 ).json ( { error : [{ msg : "Con't able to create an account as a admin"}]});
        }
        const salt =  await bcryptjs.genSalt();
        const hash = await bcryptjs.hash( password, salt );
        user.password = hash
        user.role == "doctor" ? user.isVerified = false : user.isVerified = true;
        await user.save();
        const body  = _.pick( user, [ "_id", "name", "email", "phoneNumber", "role", "createdAt"] );
        return res.status( 201 ). json( body );
    } catch (error) {
        return res.status( 500 ). json ( { error : [{ msg :  "Something went wrong, while signUp!"}] })
    }
}

/**
 * this function handles user sign-in process.
 * This function accepts user login credentials (email or phone number, and password) from the request body,
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses..
 * @returns {Object} - A JSON response containing either the generated token or an error message.
*/
userController.signIn = async ( req, res ) => {
    try {
        const {  email, password, phoneNumber }  = _.pick ( req.body, [ "email", "password" , "phoneNumber"] ); 
        if ( !(phoneNumber || email) ) {
            return res.status( 400 ).json( { error : [{ msg : "Phone Number / email required " }]}) ;
        }
        const  user = await checkCollection ( phoneNumber ? { phoneNumber }: {email} );
        if( ! user ) {
            return res.status( 400 ).json( { error : [{ msg : "Email / Phone Number is not registered "}]});
        }
        const isValid =  await bcryptjs.compare( password , user.password );
        if( !isValid ){
            return res.status( 400 ).json({ error : [{ msg : "Invalid Email / Password "}]} );
        }
        const token = await generateToken ( user );
        return res.json( { token : `Bearer ${ token }`} );
    } catch (error) {
        return res.status( 500 ).json( { error : [{ msg : "Something went wrong! while signIn"}]})
    }
}

/**
 * This function handles the authenticated user's account information.
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response containing the authenticated user's details.
 */
userController.account =  async ( req, res ) => {
    try {
        const body = _.pick(req.currentUser, ["userId", "role", "name", "isVerified"] )
        res.json( body );
    } catch (error) {
        res.status( 500 ).json ( { error :[{ msg : "Something went wrong while fetching account details!"}]})
    }
}

export default userController;