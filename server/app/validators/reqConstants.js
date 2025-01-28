
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
/**
 * Defining commonly used validation rules for the 'userId' field and assigning it to a variable for reuse.
*/
const userId = {
    in : [ "query"],
    isMongoId : {
        errorMessage : "Id is invalid "
    }
}
 
/**
 * Defining commonly used validation rules for the 'token' field and assigning it to a variable for reuse.
*/
const token = {
    in : [ "query"],
    isLength : {
        options : {
            min : 32,
            max : 32
        },
        errorMessage : "Token should be 32 degits"
    }
}

/**
 * Defining commonly used validation rules for the 'DOB' field and assigning it to a variable for reuse.
*/
const dob = {
    in : [ "body" ],
    exists : {
        errorMessage : "Date of Birth field is required"
    },
    notEmpty :{
        errorMessage : "DOB filed should not be empty"
    },
    trim : true,
    custom : {
        options : ( value ) => {
            if( !(/^\d{4}-\d{2}-\d{2}$/.test( value )) ) {
                throw new Error ( "Date Of Birth shoould be in the yyyy-MM-dd format");
            } else if(new Date() < new Date( value ) ){
                throw new Error ( "DOB con't be fucture" );
            }
            return true
        }
    }
}

/**
 * Defining commonly used validation rules for the 'Gender' field and assigning it to a variable for reuse.
*/
const gender = {
    in : [ "body" ],
    exists : {
        errorMessage : "Date of Birth field is required"
    },
    notEmpty :{
        errorMessage : "DOB filed should not be empty"
    },
    trim : true,
    isIn : {/*  this property check the Gender */
        options: [ [ "male", "female", "other" ] ],
        errorMessage : "Genedr Should be one of the following Male, Female or other"
    }
}

/**
 * Defining commonly used validation rules for the 'specialization' field and assigning it to a variable for reuse.
*/
const specialization = {
    in : [ "body" ],
    exists : {
        errorMessage : "Specialization filed is required"
    },
    notEmpty : {
        errorMessage : "Specialization filed con not be empty"
    },
    custom : {
        options : ( value ) => {
            if( !value ||  value.length === 0 ){
                throw new Error ( "Specialization field can not be empty" );
            }
            return true;
        }
    },
    trim : true
}

/**
 * Defining commonly used validation rules for the 'licenceNumber' field and assigning it to a variable for reuse.
*/
const licenceNumber = {
    in : [ "body" ],
    exists : {
        errorMessage : "Licence Number filed is required"
    },
    notEmpty : {
        errorMessage : "Licence Number filed con not be empty"
    },
    trim : true
}

/**
 * Defining commonly used validation rules for the 'licenceExpiryDate' field and assigning it to a variable for reuse.
*/
const licenceExpiryDate = {
    in : [ "body" ],
    exists : {
        errorMessage : "Licence Expiry Date field is required"
    },
    notEmpty :{
        errorMessage : "Licence Expiry Date filed should not be empty"
    },
    trim : true,
    custom : {
        options : ( value ) => {
            if( !(/^\d{4}-\d{2}-\d{2}$/.test( value )) ) {
                throw new Error ( "Licence Expiry Date shoould be in the yyyy-MM-dd format");
            } else if(new Date() > new Date( value ) ){
                throw new Error ( "Licence Expiry Date con't be past" );
            }
            return true
        }
    }
}

/**
 * Defining commonly used validation rules for the 'yearsOfExperience' field and assigning it to a variable for reuse.
*/
const yearsOfExperience = {
    in : [ "body" ],
    exists : {
        errorMessage : "Years of Experience field is required"
    },
    notEmpty :{
        errorMessage : "Years of Experience filed should not be empty"
    },
    trim : true,
    isNumeric : {
        options : {
            no_symbols: true, // using this property we can prevent + - to added to years of experience
        },
        errorMessage : "Years of Experience should consists only Number"
    }
}

/**
 * Defining commonly used validation rules for the 'buildingNo' field and assigning it to a variable for reuse.
*/
const buildingNo = {
    in : [ "body" ],
    exists : {
        errorMessage : "Buildning Number field is required"
    },
    notEmpty :{
        errorMessage : "Buildning Number filed should not be empty"
    },
    trim : true,
}

/**
 * Defining commonly used validation rules for the 'street' field and assigning it to a variable for reuse.
*/
const street = {
    in : [ "body" ],
    exists : {
        errorMessage : "Street field is required"
    },
    notEmpty :{
        errorMessage : "Street filed should not be empty"
    },
    trim : true,
}

/**
 * Defining commonly used validation rules for the 'city' field and assigning it to a variable for reuse.
*/
const city = {
    in : [ "body" ],
    exists : {
        errorMessage : "City field is required"
    },
    notEmpty :{
        errorMessage : "City filed should not be empty"
    },
    trim : true,
}

/**
 * Defining commonly used validation rules for the 'state' field and assigning it to a variable for reuse.
*/
const state = {
    in : [ "body" ],
    exists : {
        errorMessage : "State field is required"
    },
    notEmpty :{
        errorMessage : "State filed should not be empty"
    },
    trim : true,
}

/**
 * Defining commonly used validation rules for the 'country' field and assigning it to a variable for reuse.
*/
const country = {
    in : [ "body" ],
    exists : {
        errorMessage : "Country field is required"
    },
    notEmpty :{
        errorMessage : "Country filed should not be empty"
    },
    trim : true,
}

/**
 * Defining commonly used validation rules for the 'pincode' field and assigning it to a variable for reuse.
*/
const pincode = {
    in : ["body"] ,
    exists : {
        errorMessage : " Pincode is required "
    },
    notEmpty : {
        errorMessage : "Pincode should not be empty"
    },
    trim : true,
    isNumeric : {
        options : {
            no_symbols: true, // using this property we can prevent + - to added to Pincode
        },
        errorMessage : "Pincode should consists only Number"
    },
    isLength : {
        options : {
            min : 6,
            max : 6
        },
        errorMessage : "Pincode should be 6 degits"
    }
}

/**
 * Defining commonly used validation rules for the 'pincode' field and assigning it to a variable for reuse.
*/
const consultationFee = {
    in : ["body"] ,
    exists : {
        errorMessage : " Consultation Fee is required "
    },
    notEmpty : {
        errorMessage : "Consultation Fee should not be empty"
    },
    trim : true,
    isNumeric : {
        options : {
            no_symbols: true, // using this property we can prevent + - to added to consultationFee
        },
        errorMessage : "Consultation Fee should consists only Number"
    },
    custom :{
        options : (  value ) => {
            if( Number( value ) < 1){
                throw new Error( "Consultation Fee should greterthan 1")
            }
            return true
        }
    }
}
export { name, email, password, phoneNumber, role, otp, userId, token, dob, gender, specialization, licenceNumber, licenceExpiryDate, yearsOfExperience, buildingNo, street, city, state, country, pincode , consultationFee };