import OTP from "../../models/otpModel.js";
import generateRandomNumber from "./generateRandomNo.js";

/**
 * This function checks if an OTP (One-Time Password) exists in the collection for the specified user.
 * @param {Object} user - The user object, which should contain a userId property.
 * @returns {Object|null} - Returns a  OTP document if found, or null if not found.
*/
const checkOtpinCollection = async ( user ) => {
    try {
        const otp = await OTP.findOne( user );
        return otp;
    } catch (error) {
        throw new Error ( "Something went wrong, Error while validating OTP ")
    }
}

/**
 * This funnction generates a new OTP (One-Time Password) for a user or updates an existing OTP if one already exists.
 * @param {string} id - The unique identifier of the user for whom the OTP is being generated.
 * @returns {Object} - Returns a OTP document that was either updated or created.
*/
const generateOtp = async ( id ) =>{
    try {
        /*  adding 5 min expiration time to the  otp  */
        const expireAt =  new Date( Date.now () + 5 * 60 * 1000) // min * sec * miliSecond
        const randomNo = generateRandomNumber();
        let otp = await checkOtpinCollection({userId : id });
        // if the otp is already exist for the user, then updating that Document with new OTP, expireTime and  retry Counts
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
        throw new Error ( "Something went wrong, Error while generating OTP! ")
    }
}

export default generateOtp;