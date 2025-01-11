import mongoose from "mongoose";
/**
 * This function attempts to establish a connection to the database and logs the result.
 * - It uses the MongoDB connection URL defined in the environment variable `DB_URL`.
 * - If the connection is successful, a success message is logged to the console.
 * - If an error occurs during the connection process, it is caught and logged.
 */
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