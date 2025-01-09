import OTP from "../models/otpModel.js";
import generateRandomNumber from "./generateRandomNo.js";
const checkOtpCollection = async ( id ) =>{
    try {
        /*  adding 5 min expiration time to the  otp  */
        const expireAt =  new Date( Date.now () + 5 * 60 * 1000) // min * sec * miliSecond
        const randomNo = generateRandomNumber();
        let otp = await OTP.findOne( {userId : id });
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
export default checkOtpCollection;