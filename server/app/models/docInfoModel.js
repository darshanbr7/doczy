import { model, Schema } from "mongoose";

const docInfoSchema = new Schema( {
    userId : {
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    profileId : {
        type:Schema.Types.ObjectId,
        ref : "Profile"
    },
    specialization : [ String ],
    licenceNumber : String,
    licenceExpiryDate : Date,
    licenceImage : String,
    yearsOfExperience : Number,
    consultationFee : Number,
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