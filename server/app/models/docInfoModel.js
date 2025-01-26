import { model, Schema } from "mongoose";

const docInfoSchema = new Schema( {
    userId : {
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    specialization : Array,
    licenceNumber : String,
    LicenceExpiryDate : Date,
    LicennceImage : String,
    yearsOfExperience : Number,
    address : {
        buildingNo: String,
        street: String,
        city : String,
        state : String,
        country : String,
        pincode : Number,
        latitude : Number,
        longitude : Number
    },
    isVerified :{
        type : Boolean,
        default : false
    }
}, { timestamps: true } );

const DocInfo = model( "docInfo", docInfoSchema );
export default DocInfo;