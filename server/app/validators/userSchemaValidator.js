import User from "../models/userModel.js"
/* importing helper function to make a db call to check phone no and email is already exist or not */
import checkCollection from "../helpers/checkCollection.js"
export const userRegisterSchema = {
    name : {
        in : [ "body" ],
        exists : {
            errorMessage : "name field is required"
        },
        notEmpty : {
            errorMessage : "name field should not be empty"
        },
        trim : true
    },
    email :{
        in : [ "body" ],
        exists : {
            errorMessage : "Email field is required"
        },
        notEmpty : {
            errorMessage : "Email field should not be empty"
        },
        isEmail : {
            errorMessage : "Enter the proper Email format"
        },
        trim : true,
        normalizeEmail : true,
        custom : {
            options : async (  value ) => {
                try {
                    const user = await checkCollection( { email : value });
                    if( user ) {
                        throw new Error ( " email is already exist ");
                    }
                    return true;
                } catch (error) {
                    throw new Error ( error.message );
                }
            }
        }
    },
    phoneNumber : {
        in : [ "body" ],
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
        },
        custom : {
            options :   async ( value ) => {
                try {
                    const user = await checkCollection( { phoneNumber :  value });
                    if( user ) {
                        throw new Error( "Phone Number is already exists ");
                    }
                    return true;
                } catch ( error ) {
                    throw new Error( error.message )
                }
            }
        }
    },
    password: {
        in : [ "body" ],
        exists : {
            errorMessage : "password feild is required",
        },
        notEmpty : {
            errorMessage :  "password should not be empty"
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
            errorMessage : "Password shold contain one UpperCase, one LowerCase, one Number and one Symbol with minimum eight character "
        },
        isLength : { /*  adding min -  max  Length to the password  */
            options : {
                min : 8,
                max : 20
            },
            errorMessage : "Password length should be 8 to 20 "
        },
        custom : {/*  using this code validating password not conatain repeated word */
            options : ( value ) => {
                if( /(\w)\1{2,}/.test(value) ){
                    throw new Error ( "Password should not conatin repeted character one next to another")
                }
                return true;
            }
        }
    },
    role : {
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
}

export const  userLoginSchema = {
    email : {
        in : [ "body" ], 
        exists : {
            errorMessage : "Email field is required"
        },
        notEmpty : {
            errorMessage : 'Email field should not be empty'
        },
        isEmail : {
            errorMessage : "Enter the proper Email format"
        },
        optional : true,
        normalizeEmail :  true,
        trim : true,
    },
    phoneNumber : {
        in : [ "body" ],
        exists : {
            errorMessage : "Phone Number is required"
        },
        notEmpty : {
            errorMessage : "Phone Number Should not be empty"
        },
        trim :  true,
        isLength : {
            options :{
                min : 10,
                max:  10
            },
            errorMessage : "Phone Number should be 10 degits"
        },
        isNumeric : {
            options : {
                no_symbols :  true
            },
            errorMessage : "Phone Number consis only Number"
        },
        optional : true
    },
    password : {
        in : [ "body" ],
        exists : {
            errorMessage : "Password field is required"
        },
        notEmpty : {
            errorMessage : "Password Should not be empty"
        },
        trim : true,
        optional : true,
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
    },
    otp : {
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
        optional : true
        
    }
}