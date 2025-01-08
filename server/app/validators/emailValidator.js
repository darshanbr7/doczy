
const emailValidator = {
    email : {
        in : [ "body" ],
        exists : {
            errorMessage : "Email field is required"
        },
        notEmpty : {
            errorMessage : "Email should not be empty"
        },
        trim : true,
        isEmail : {
            errorMessage  : "enter the proper Email format"
        },
        normalizeEmail : true
    }
}
export default emailValidator