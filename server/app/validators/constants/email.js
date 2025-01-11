/**
 * Defining commonly used Validation rules for an email field and assiging to a variable for further use.
 * 
 * It ensures that the email:
 * 1. Exists in the request body(required).
 * 2. Is not empty.
 * 3. Is trimmed of any extra whitespace.
 * 4. Matches the proper email format.
 * 5. Is normalized, meaning it will be converted to a standard format (e.g., lowercase domain).
 * The property "errorMessage" is used throw an error when the given value is failed to satisfy the conditon
*/
 const email = {
    in : [ "body" ],
    exists : {
        errorMessage : "Email field is required"
    },
    notEmpty : {
        errorMessage : "Email should not be empty"
    },
    trim : true,
    isEmail : {
        errorMessage  : "Enter the proper Email format"
    },
    normalizeEmail : true
}
export default email;