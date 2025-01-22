import { model, Schema } from "mongoose";
/**
 * Token Schema for storing token in the database.
 * It includes fields userId and token 
*/
const tokenSchema  = new Schema( {
    userId : {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    token : String
}, { timestamps : true });

const Token = model( "Token", tokenSchema );
export default Token;