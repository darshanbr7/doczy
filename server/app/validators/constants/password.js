/**
 * Defining commonly used validation rules for the 'password' field and assigning it to a variable for reuse.
 * 
 * It ensures that the password:
 * 1. Exists in the request body (required).
 * 2. Is not empty.
 * 3. Is trimmed of any leading or trailing whitespace.
 * 4. Is strong enough, requiring:
 *    - At least 8 characters.
 *    - At least 1 number.
 *    - At least 1 uppercase letter.
 *    - At least 1 lowercase letter.
 *    - At least 1 symbol (e.g., !, @, #).
 * The property "errorMessage" is used to throw an error when the given value fails to satisfy the condition.
*/
const password = {
    in : [ "body" ],
    exists : {
        errorMessage : "Password field is required"
    },
    notEmpty : {
        errorMessage : "Password Should not be empty"
    },
    trim : true,
    isStrongPassword : {
        options : {
            minLength : 8,
            minNumber : 1,
            minUpperCase : 1,
            minLowerCase : 1,
            minSymbol : 1
        }, 
        errorMessage : "Password should contain one UpperCase, one LowerCase, one Number and one Symbol with minimum eight character"
    }
}
export default password;