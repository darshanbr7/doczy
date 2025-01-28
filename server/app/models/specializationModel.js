import { model, Schema } from "mongoose";

const specializationSchema = new Schema( {
    name : String
}, { timestamps : true } );

const Specialization = model( "specialization", specializationSchema );

export default Specialization;