import checkCollection from "../helpers/userControllerHelpers/checkCollection.js";
import { email, name, password, phoneNumber, role, otp } from "./reqConstants.js";

/**
 * Defining a validation schema for user registration. This schema ensures that the following fields are validated
 */
export const userRegisterSchema = {
    name: {
        ...name
    },
    email: {
        ...email,
        custom: {
            options: async (value) => {
                try {
                    const user = await checkCollection({ email: value });
                    if (user) {
                        throw new Error(" email is already exist ");
                    }
                    return true;
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }
    },
    phoneNumber: {
        ...phoneNumber,
        custom: {
            options: async (value) => {
                try {
                    const user = await checkCollection({ phoneNumber: value });
                    if (user) {
                        throw new Error("Phone Number is already exists ");
                    }
                    return true;
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        }
    },
    password: {
        ...password,
        isLength: { /*  adding min -  max  Length to the password  */
            options: {
                min: 8, 
                max: 20
            },
            errorMessage: "Password length should be 8 to 20 "
        },
        custom: {/*  using this code validating password not conatain repeated word */
            options: (value) => {
                if (/(\w)\1{2,}/.test(value)) {
                    throw new Error("Password should not have repetitive characters thrice.")
                }
                return true;
            }
        }
    },
    role: {
        ...role
    }
}
/**
 * Defining a validation schema for user login. This schema ensures that the following fields are validated:
* here user can go with fallowing combinations
    * email - password
    * phoneNumber - password
    * email - OTP
    * phoneNumber - OTP
*/
export const userLoginSchema = {
    email: {
        ...email,
        optional: true
    },
    phoneNumber: {
        ...phoneNumber,
        optional: true
    },
    password: {
        ...password,
        optional: true,
    },
    otp: {
        ...otp,
        optional: true
    }
}