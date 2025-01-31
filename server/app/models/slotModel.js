import { model, Schema } from "mongoose";

/**
 * Slot Schema for storing slot related to the doctor in the database.
*/
const slotSchema = new Schema( {
    slots : [ Object ],
    date : Date,
    doctorId :{
        type :  Schema.Types.ObjectId,
        ref : "user"
    }
}, { timestamps : true } );
const Slot = model( "Slot", slotSchema );

export default Slot;