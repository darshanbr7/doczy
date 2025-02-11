import { model, Schema } from "mongoose";

const appointmentSchema = new Schema( {
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    doctorId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    appointmentDate : Date,
    appointmentTime : String,
    status :{
        type : String,
        enum : [ "pending", "completed", "cancelled" ],
        default : "pending"
    },
    userEmail : String
}, { timestamps: true } )

const Appointment = model( "Appointment", appointmentSchema );
export  default Appointment