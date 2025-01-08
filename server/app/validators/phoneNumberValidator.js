const phoneNumberValidator  = {
   phoneNumber : {
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
}
export default phoneNumberValidator;