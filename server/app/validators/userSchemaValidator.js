import checkCollection from "../helpers/userControllerHelpers/checkCollection.js";
import email from "./constants/email.js";
import password from "./constants/password.js";
import phoneNumber from "./constants/phoneNumber.js";
import otp from "./constants/otp.js"
import name from "./constants/name.js";
import role from "./constants/role.js";

/**
 * Defining a validation schema for user registration. This schema ensures that the following fields are validated:
 * 1. 'name' - validation as per the defined 'name' variable.
 * 2. 'email' - validation as per the defined 'email' variable.
 *            - Custom validation checks if the email already exists in the collection.
 * 3. 'phoneNumber' - validation as per the defined 'phoneNumber' variable
 *                  - Custom validation checks if the phone number already exists in the collection.
 * 4. 'password' -  validation as per the defined 'password' variable
 *                  - Checks if the password meets the required length and custom validation to prevent repeated characters.
 * 5. 'role' -  validation as per the defined 'role' variable.
 * The schema ensures the fields conform to expected standards and throws appropriate error messages if they fail.
 */
export const userRegisterSchema = {
    name : {
        ...name
    },
    email :{
        ...email,
        custom : {
            options : async (  value ) => {
                try {
                    const user = await checkCollection( { email : value });
                    if( user ) {
                        throw new Error ( " email is already exist ");
                    }
                    return true;
                } catch (error) {
                    throw new Error ( error.message );
                }
            }
        }
    },
    phoneNumber : {
        ...phoneNumber,
        custom : {
            options :   async ( value ) => {
                try {
                    const user = await checkCollection( { phoneNumber :  value });
                    if( user ) {
                        throw new Error( "Phone Number is already exists ");
                    }
                    return true;
                } catch ( error ) {
                    throw new Error( error.message )
                }
            }
        }
    },
    password: {
        ...password,
        isLength : { /*  adding min -  max  Length to the password  */
            options : {
                min : 8,
                max : 20
            },
            errorMessage : "Password length should be 8 to 20 "
        },
        custom : {/*  using this code validating password not conatain repeated word */
            options : ( value ) => {
                if( /(\w)\1{2,}/.test(value) ){
                    throw new Error ( "Password should not conatin repeted character one next to another")
                }
                return true;
            }
        }
    },
    role : {
        ...role
    }
}
/**
 * Defining a validation schema for user login. This schema ensures that the following fields are validated:
 * 1. 'email' - validation as per the defined 'email' variable.
 *            - This field is optional during login.
 * 2. 'phoneNumber' - validation as per the defined 'phoneNumber' variable.
 *                  - This field is optional during login.
 * 3. 'password' - validation as per the defined 'password' variable.
 *                  - This field is optional during login.
 * 4. 'otp' - validation as per the defined 'otp' variable.
 *           - This field is optional during login.
 * The schema ensures the fields conform to expected standards and throws appropriate error messages if they fail.
* here user can go with fallowing combinations
    * email - password
    * phoneNumber - password
    * email - OTP
    * phoneNumber - OTP
*/
export const  userLoginSchema = {
    email : {
        ...email,
        optional : true
    },
    phoneNumber : {
        ...phoneNumber,
        optional : true
    },
    password : {
        ...password,
        optional : true,
    },
    otp : {
        ...otp,
        optional : true
    }
}