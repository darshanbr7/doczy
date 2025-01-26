import { model, Schema } from "mongoose";

const specializationSchema = new Schema( {
    createdBy : {
        type : Schema.Types.ObjectId
    },
    name : String
}, { timestamps : true } );

const Specialization = model( "specialization", specializationSchema );

export default Specialization;