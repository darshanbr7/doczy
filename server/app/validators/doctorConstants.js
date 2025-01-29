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
export { specialization, licenceNumber, licenceExpiryDate, yearsOfExperience, buildingNo, street, city, state, country, pincode , consultationFee }