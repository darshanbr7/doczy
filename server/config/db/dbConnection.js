import mongoose from "mongoose";
const dbConnect = async ( ) => {
    try {
        const dbUrl = process.env.DB_URL
        const connect = await mongoose.connect( dbUrl );
        if( connect ) console.log( `database connected successfully`) 
    } catch ( error ) {
        console.log( error );
    }
}
export default dbConnect;