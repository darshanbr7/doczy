import  { model, Schema } from "mongoose";

const profileSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    avatar : String ,
    gender : {
        type: String,
        enum : [ "male", "female", "other" ]
    } ,
    isSubscriber : {
        type : Boolean,
        default: false
    },
    dob : Date
}, { timestamps : true } );
const Profile = model ( "Profile", profileSchema );

export default Profile;