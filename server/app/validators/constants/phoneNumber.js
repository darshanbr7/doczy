/**
 * Defining commonly used validation rules for the 'phoneNumber' field and assigning it to a variable for reuse.
 * 
 * It ensures that the phone number:
 * 1. Exists in the request body (required).
 * 2. Is not empty.
 * 3. Is trimmed of any leading or trailing whitespace.
 * 4. Contains only numeric characters (no symbols like + or -).
 * 5. Has a length of exactly 10 digits.
 * The property "errorMessage" is used to throw an error when the given value fails to satisfy the condition.
*/
const phoneNumber = {
    in : ["body"] ,
    exists : {
        errorMessage : " Phone Number is required "
    },
    notEmpty : {
        errorMessage : "Phone Number should not be empty"
    },
    trim : true,
    isNumeric : {
        options : {
            no_symbols: true, // using this property we can prevent + - to added to phone number
        },
        errorMessage : "Phone Number should consists only Number"
    },
    isLength : {
        options : {
            min : 10,
            max : 10
        },
        errorMessage : "Phone Number should be 10 degits"
    }
}

export default phoneNumber;