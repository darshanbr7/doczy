export const reviewValidatorSchema = {
    doctorId: {
        in: ["body"],
        isMongoId: {
            errorMessage: " Invalid Doctor ID"
        },
        exists : {
            errorMessage : " Doctor ID is required"
        },
        notEmpty : {
            errorMessage : "Doctor ID should not be empty"
        },
        trim  : true
    },
    rating : {
        in: ["body"], 
        exists : {
            errorMessage : "Rating is required"
        },
        notEmpty : {
            errorMessage : "Rating should not be empty"
        },
        trim  : true,
        isLength: {
            options: {
                min: 1,
                max: 1
            },
            errorMessage: "Rating should be 1 degits"
        },
        isInt: {
            options: { min: 1, max: 5 },
            errorMessage: "Rating should be an integer between 1 and 5"
        },
        isNumeric: {
            options: {
                no_symbols: true
            },
            errorMessage: "Rating consis only Number"
        },

    },
    description :  {
        in: ["body"], 
        exists : {
            errorMessage : "Description is required"
        },
        notEmpty : {
            errorMessage : "Description should not be empty"
        },
        trim  : true,
    }
}