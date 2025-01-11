import OTP from "../../models/otpModel.js";
import generateRandomNumber from "./generateRandomNo.js";

/**
 * This function checks if an OTP (One-Time Password) exists in the collection for the specified user.
 * This function queries the OTP collection in the database using the user ID to retrieve the associated OTP.
 * If an OTP is found, it is returned. If an error occurs during the query, a generic error message is thrown.
 * @param {Object} user - The user object, which should contain a userId property.
 * @returns {Object|null} - Returns a  OTP document if found, or null if not found.
*/
const checkOtpinCollection = async ( user ) => {
    try {
        const otp = await OTP.findOne( user );
        return otp;
    } catch (error) {
        throw new Error ( "Something went wrong! ")
    }
}

/**
 * This funnction generates a new OTP (One-Time Password) for a user or updates an existing OTP if one already exists.
 * This function checks if an OTP already exists for the user with the given `id`. If it does, the OTP is updated 
 * with a new randomly generated number, a 5-minute expiration time, and a retry count of 3. If no OTP exists for 
 * the user, a new OTP document is created with the specified expiration time and the generated OTP.
 * The function handles the generation of the OTP and ensures that it expires 5 minutes after creation.
 * @param {string} id - The unique identifier of the user for whom the OTP is being generated.
 * @returns {Object} - Returns a OTP document that was either updated or created.
*/
const generateOtp = async ( id ) =>{
    try {
        /*  adding 5 min expiration time to the  otp  */
        const expireAt =  new Date( Date.now () + 5 * 60 * 1000) // min * sec * miliSecond
        const randomNo = generateRandomNumber();
        let otp = await checkOtpinCollection({userId : id });
        if( otp ){
            otp.otp = randomNo;
            otp.expireAt = expireAt;
            otp.retryCounts = 3
            await otp.save();
        } else {
            otp = new OTP( { userId: id, otp : randomNo, expireAt });
            await otp.save();
        }
        return otp;
    } catch (error) {
        throw new Error ( "Something went wrong! ")
    }
}
export default generateOtp;