import twilio from "twilio"
import _ from "lodash";
import nodemailer from "nodemailer";
import OTP from "../models/otpModel.js";
import checkCollection from "../helpers/userControllerHelpers/checkCollection.js";
import generateOtp from "../helpers/userControllerHelpers/checkOtpCollection.js";
import generateToken from "../helpers/userControllerHelpers/generateToken.js";
import { OTP_EMAIL_TEMPLATE } from "../helpers/userControllerHelpers/mailTemplets.js";
import mailSender from "../helpers/userControllerHelpers/mailSender.js";
const otpController = {}
/**
 *This function helps to Send a SMS OTP to the user for authentication purposes.
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response indicating the result of the OTP sending process.
*/
otpController.sendSmsOtp = async (req, res) => {
    try {
        const { phoneNumber } = _.pick(req.body, ["phoneNumber"]);
        const user = await checkCollection({ phoneNumber: phoneNumber });
        if (!user) {
            return res.status(400).json({ error: [{ msg: "Phone Number is not Registered " }] });
        }
        if (!user.isVerified) {
            return res.status(404).json({ error: [{ msg: "User is not verified! " }] });
        }
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        const { otp } = await generateOtp(user._id);
        const messageOptions = {
            from: process.env.TWILIO_FROM_NUMBER,
            to: `+91${phoneNumber}`,
            body: `Your One-Time-Password( OTP ) for the DOCZY Application login is ${otp}`
        }
        await client.messages.create(messageOptions);
        res.json({ message: "OTP sent succesfully" });
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong, while sending sms " }] })
    }
}

/**
 * This function handles the process of sending an OTP via email to a user for verifying their identity. 
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response indicating the result of the OTP sending process.
*/
otpController.sendEmailOtp = async (req, res) => {
    try {
        const { email } = _.pick(req.body, ["email"]);
        const user = await checkCollection({ email: email });
        if (!user) {
            return res.status(401).json({ error: [{ msg: "Email is not registered " }] })
        }
        if (!user.isVerified) {
            return res.status(404).json({ error: [{ msg: "User is not verified! " }] });
        }
        const { otp } = await generateOtp(user._id);
        const templete = OTP_EMAIL_TEMPLATE.replace("{verificationCode}", otp);
        await mailSender(email, "OTP code for Login", templete);
        res.status(201).json({ message: "OTP sent succesfully " });
    } catch (error) {
        res.status(500).json({ error: [{ msg: "Something went wrong, Error while sending Email OTP! " }] });
    }
}

/**
 * This function verifies the OTP entered by the user during the login process.
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response containing either a generated token or an error message.
*/
otpController.verifyOtp = async (req, res) => {
    try {
        const { email, phoneNumber, otp } = _.pick(req.body, ["email", "phoneNumber", "otp"]);
        if (!(phoneNumber || email)) {
            return res.status(400).json({ error: [{ msg: "Phone Number / email required " }] });
        }
        const user = await checkCollection(phoneNumber ? { phoneNumber } : { email });
        const getOtp = await OTP.findOne({ userId: user._id });
        if (!user || !getOtp) {
            throw new Error("OTP not found for this user")
        }
        if (getOtp.retryCounts === 0) {
            await getOtp.deleteOne();
            return res.status(400).json({ error: [{ msg: "Exceded the attempts for login try after some time" }] });
        }
        const currentTime = new Date();
        if (currentTime > getOtp.expireAt) {
            return res.status(400).json({ error: [{ msg: "OTP has expired" }] })
        } else {
            if (otp == getOtp.otp) {
                const token = await generateToken(user);
                return res.json({ token: `Bearer ${token}` });
            } else {
                const newCount = {
                    retryCounts: getOtp.retryCounts - 1
                }
                await OTP.findOneAndUpdate({ userId: user.id }, newCount, { new: true });
                throw new Error( `Invalid OTP, there are ${newCount.retryCounts} are remaining `)
            }
        }


    } catch (error) {
        res.status(500).json({ error: [{ msg: error.message }] })
    }
}

export default otpController;