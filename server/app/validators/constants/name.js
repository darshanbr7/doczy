/**
 * Defining commonly used Validation rules for an name field and assiging to a variable for further use.
 * 
 * It ensures that the name:
 * 1. Exists in the request body(required).
 * 2. Is not empty.
 * 3. Is trimmed of any extra whitespace.
 * The property "errorMessage" is used throw an error when the given value is failed to satisfy the conditon
*/
const name  = {
    in : [ "body" ],
    exists : {
        errorMessage : "name field is required"
    },
    notEmpty : {
        errorMessage : "name field should not be empty"
    },
    trim : true
}
export default name;