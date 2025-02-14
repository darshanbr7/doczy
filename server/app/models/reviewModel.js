import { model, Schema } from "mongoose";

const reviewSchema = new Schema( {
    userId :{
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    doctorId : {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    rating : Number,
    description : String
}, { timestamps: true });

const Review = model( "Review", reviewSchema );

export default Review