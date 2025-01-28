import { specialization,licenceNumber, licenceExpiryDate,yearsOfExperience , buildingNo, street, city, state, country, pincode, consultationFee } from "./reqConstants.js";
const doctorInfoSchemaValidator = {
    specialization ,
    licenceNumber ,
    licenceExpiryDate ,
    yearsOfExperience ,
    consultationFee,
    "address.buildingNo" : {
        ...buildingNo
    },
    "address.street" : {
        ...street
    },
    "address.city" : {
        ...city
    },
    "address.state" : {
        ...state
    },
    "address.country" : {
        ...country
    },
    "address.pincode" : {
        ...pincode
    }
}
export default doctorInfoSchemaValidator