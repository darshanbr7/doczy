/**
 * Defining commonly used Validation rules for an email field and assiging to a variable for further use.
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

/**
 * Defining commonly used Validation rules for an name field and assiging to a variable for further use.
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

/**
 * Defining commonly used validation rules for the 'otp' (One-Time Password) field and assigning it to a variable for reuse.
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

/**
 * Defining commonly used validation rules for the 'password' field and assigning it to a variable for reuse.
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

/**
 * Defining commonly used validation rules for the 'phoneNumber' field and assigning it to a variable for reuse.
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

/**
 * Defining commonly used validation rules for the 'role' field and assigning it to a variable for reuse.
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

export { name, email, password, phoneNumber, role, otp }