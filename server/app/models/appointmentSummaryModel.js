import { model, Schema } from "mongoose";

const appoinntSummarySchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
    },
    recomandation: String,  
    medicalReport: String,
    nextFallowUp: String,
}, { timestamps: true });

const AppointmentSummary = model( "AppointmentSummary", appoinntSummarySchema );

export default AppointmentSummary