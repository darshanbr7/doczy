export const appointmentSchemaValidator = {
    customerId : {
        in : [ "body" ],
        isMongoId : {
            errorMessage : "Customer id is invalid"
        },
        exists : {
            errorMessage : "Customer Id is required"
        },
        notEmpty : {
            errorMessage : "Customer Id should not be empty"
        }
    },
    appointmentId : {
        in : [ "body" ],
        isMongoId : {
            errorMessage : "Appointment Id is invalid"
        },
        exists : {
            errorMessage : "Appointment Id is required"
        },
        notEmpty : {
            errorMessage : "Appointment Id should not be empty"
        }
    },
    recomandation : {
        in : [ "body" ],
        exists : {
            errorMessage : "Recomandation field is required"
        },
        notEmpty : {
            errorMessage : "Recomandation field should not be empty"
        }
    }
}