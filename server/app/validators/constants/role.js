/**
 * Defining commonly used validation rules for the 'role' field and assigning it to a variable for reuse.
 * It ensures that the role:
 * 1. Exists in the request body (required).
 * 2. Is not empty.
 * 3. Is trimmed of any leading or trailing whitespace.
 * 4. Matches one of the allowed role values: "admin", "doctor", or "customer".
 * The property "errorMessage" is used to throw an error when the given value fails to satisfy the condition.
*/
const role ={
    in : [ "body" ],
    exists : {
        errorMessage : "Role  field is required"
    },
    notEmpty : {
        errorMessage : "Role field should not be empty"
    },
    trim : true,
    isIn : {/*  this property check the role */
        options: [ [ "admin", "doctor", "customer" ] ],
        errorMessage : "Role Should be one of the following Doctor or Customer"
    }
}
export default role;