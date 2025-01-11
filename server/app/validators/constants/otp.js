/**
 * Defining commonly used validation rules for the 'otp' (One-Time Password) field and assigning it to a variable for reuse.
 * It ensures that the OTP:
 * 1. Exists in the request body (required).
 * 2. Is not empty.
 * 3. Is trimmed of any leading or trailing whitespace.
 * 4. Has a length of exactly 6 digits.
 * 5. Contains only numeric characters (no symbols).
 * The property "errorMessage" is used to throw an error when the given value fails to satisfy the condition.
 */
const otp = {
    in : [ "body" ],
    exists : {
        errorMessage : "OTP is required"
    },
    notEmpty : {
        errorMessage : "OTP Should not be empty"
    },
    trim :  true,
    isLength : {
        options :{
            min : 6,
            max:  6
        },
        errorMessage : "OTP should be 6 degits"
    },
    isNumeric : {
        options : {
            no_symbols :  true
        },
        errorMessage : "OTP consis only Number"
    },    
}
export default otp;