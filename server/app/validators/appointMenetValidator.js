import { doctorId } from "./appointmentConstants.js"
import { date } from "./slotValidator.js"
import { email } from "./reqConstants.js"

export const appointMentSchemaValidator = {
    doctorId,
    appointmentDate: {
        date
    },
    appointmentTime: {
        in: ["body"],
        exists: {
            errorMessage: "Appointment Time  field is required"
        },
        notEmpty: {
            errorMessage: "Appointment Time field should not be empty"
        },
        trim: true,
        custom : {
            options : (  value ) => {
                if( !(/^([0-9]{1,2}):([0-9]{2})\s([AP][M])$/).test( value ) ){
                    throw new Error ( "Appointment format is incorrect ")
                }
                return true
            }
        }
    },
    status: {
        in: ["body"],
        exists: {
            errorMessage: "Role  field is required"
        },
        notEmpty: {
            errorMessage: "Role field should not be empty"
        },
        trim: true,
        isIn: {
            options: ["pending", "completed", "cancelled"],
            errorMessage: "Role Should be one of the following Doctor or Customer"
        }
    },
    userEmail: {
        email
    }
}