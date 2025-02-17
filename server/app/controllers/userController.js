import bcryptjs from "bcryptjs"
import _ from "lodash";
import randToken from "rand-token"
import User from "../models/userModel.js"
import Token from "../models/tokenModel.js";
import Profile from "../models/profileModel.js"
import Appointment from "../models/appointmentModel.js";
import Review from "../models/reviewModel.js"
import Slot from "../models/slotModel.js";
import DocInfo from '../models/docInfoModel.js'
import AppointmentSummary from "../models/appointmentSummaryModel.js"
import checkCollection from "../helpers/userControllerHelpers/checkCollection.js"
import generateToken from "../helpers/userControllerHelpers/generateToken.js";
import { TOKEN_EMAIL_TEMPLATE, FORGOT_PASSWORD_EMAIL_TEMPLATE } from "../helpers/userControllerHelpers/mailTemplets.js";
import mailSender from "../helpers/userControllerHelpers/mailSender.js";
import mongoose from "mongoose";

const userController = {}
/**
 * This function accepts user input from the request body, validates and processes the information, 
    and creates a new user record in the database
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response containing either the created user data or an error message.
*/
userController.signUp = async (req, res) => {
    try {
        const { name, email, role, password, phoneNumber } = _.pick(req.body, ["name", "email", "password", "role", "phoneNumber"]);
        const user = new User({ name, email, phoneNumber, password, role });
        const count = await User.countDocuments();
        if (count !== 0 && role == "admin") {
            return res.status(500).json({ error: [{ msg: "Con't able to create an account as a admin" }] });
        }
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(password, salt);
        user.password = hash
        user.role == "admin" ? user.isVerified = true : user.isVerified = false;
        if (user.role !== "admin") {
            const token = randToken.generate(32);
            await new Token({ userId: user._id, token }).save();
            const baseUrl = process.env.BASE_URL;
            const url = `${baseUrl}/verify?userId=${user._id}&token=${token}`;
            const templet = TOKEN_EMAIL_TEMPLATE.replace("{token}", url);
            await mailSender(user.email, " Verify your account ", templet);
        }
        await user.save();
        const body = _.pick(user, ["_id", "name", "email", "phoneNumber", "role", "createdAt"]);
        return res.status(201).json(body);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: [{ msg: "Something went wrong, while signUp!" }] })
    }
}

/**
 * this function handles user sign-in process.
 * This function accepts user login credentials (email or phone number, and password) from the request body,
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses..
 * @returns {Object} - A JSON response containing either the generated token or an error message.
*/
userController.signIn = async (req, res) => {
    try {
        const { email, password, phoneNumber } = _.pick(req.body, ["email", "password", "phoneNumber"]);
        if (!(phoneNumber || email)) {
            return res.status(400).json({ error: [{ msg: "Phone Number / email required " }] });
        }
        const user = await checkCollection(phoneNumber ? { phoneNumber } : { email });
        if (!user) {
            return res.status(404).json({ error: [{ msg: "Email / Phone Number is not registered " }] });
        }
        if (!user.isVerified) {
            return res.status(404).json({ error: [{ msg: "User is not verified! " }] });
        }
        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) {
            return res.status(403).json({ error: [{ msg: "Invalid Email / Password " }] });
        }
        const token = await generateToken(user);
        return res.json({ token: `Bearer ${token}` });
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong! while signIn" }] })
    }
}

/**
 * This function handles user verification.
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {message } - A JSON response containing status of the verification operation.
 */
userController.verify = async (req, res) => {
    try {
        const { userId, token } = _.pick(req.query, ["userId", "token"])
        const { isVerified } = _.pick(req.body, ["isVerified"]);
        const user = await checkCollection({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: [{ msg: "User is not registered " }] });
        }
        const tokenRecord = await Token.findOne({ userId, token });
        if (!tokenRecord) {
            return res.status(404).json({ error: [{ msg: "Token is invalid " }] });
        }
        await User.findByIdAndUpdate(userId, { isVerified }, { new: true, runValidators: true })
        await Token.findOneAndDelete({ userId, token });
        res.json({ success: true, message: "user verified succesfully" })
    } catch (error) {
        res.status(500).json({ error: [{ msg: "Something went wrong! while verifying account " }] })
    }
}

/**
 * This function handles the authenticated user's account information.
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response containing the authenticated user's details.
 */
userController.account = async (req, res) => {
    try {
        const body = _.pick(req.currentUser, ["userId", "role", "name", "isVerified", "email", "phoneNumber"])
        res.json(body);
    } catch (error) {
        res.status(500).json({ error: [{ msg: "Something went wrong while fetching account details!" }] })
    }
}

/**
 * This function is used to  handles the forgot password functionality.
 * @param {Object} req - The request object containing the email in the body.
 * @param {Object} res - The response object used to send the response back to the client.
*/

userController.forgotPassword = async (req, res) => {
    try {
        const { email } = _.pick(req.body, ["email"]);
        const user = await checkCollection({ email: email });
        if (!user) {
            return res.status(401).json({ error: [{ msg: "Email is not registered " }] })
        }
        const token = randToken.generate(32);
        const existingToken = await Token.findOne({ userId: user._id });
        if (existingToken) {
            existingToken.token = token;
            await existingToken.save();
        } else {
            await new Token({ userId: user._id, token }).save();
        }
        const baseUrl = process.env.BASE_URL;
        const url = `${baseUrl}/reset-password?userId=${user._id}&token=${token}`;
        const templet = FORGOT_PASSWORD_EMAIL_TEMPLATE.replace("{token}", url);
        await mailSender(user.email, " Password Reset Request ", templet);
        res.json("mail sent successfully")
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function is used to handles the password reset functionality.
 * @param {Object} req - The request object containing the `userId`, `token` in the query, and the `newPassword` in the body.
 * @param {Object} res - The response object used to send the response back to the client.
*/
userController.resetPassword = async (req, res) => {
    try {
        const { userId, token } = _.pick(req.query, ["userId", "token"]);
        const { newPassword } = _.pick(req.body, ["newPassword"]);
        const existingToken = await Token.findOne({ userId, token });
        if (!existingToken) {
            return res.status(404).json({ error: [{ msg: "Invalid token" }] })
        }
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(newPassword, salt);
        await User.findByIdAndUpdate(userId, { $set: { password: hash } }, { runValidators: true })
        await existingToken.deleteOne();
        res.json({ message: "Password has been reset successfully" });
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function is used to handles the password update functionality for a logged-in user.
 * @param {Object} req - The request object containing `userId` (in `req.currentUser`) and `updatedPassword` (in the body).
 * @param {Object} res - The response object to send back the response to the client.
*/
userController.updatePassword = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, ["userId"]);
        const { updatedPassword } = _.pick(req.body, ["updatedPassword"]);
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User Not found");
        }
        const isMatch = await bcryptjs.compare(updatedPassword, user.password);
        if (isMatch) {
            throw new Error("Old password and new Password con't be same");
        }
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(updatedPassword, salt);
        user.password = hash;
        await user.save();
        res.json("password updated successfully");
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function is used to deletes a user account along with associated data from multiple collections.
 * @param {Object} req - The request object, which contains the current user's information.
 * @param {Object} res - The response object, which is used to send back the result of the operation.
 * @returns {Object} A JSON response indicating success or failure.
 */
userController.deleteAccount = async (req, res) => {
    try {
        const { userId, role } = _.pick(req.currentUser, ["userId", "role"]);
        await User.findByIdAndDelete(userId);
        await Profile.deleteOne({ userId });
        if (role === "doctor") {
            await Review.deleteMany({ doctorId: userId });
            await Slot.deleteMany({ doctorId: userId });
            await DocInfo.deleteMany({ userId })
            await AppointmentSummary.deleteMany({ doctorId: userId })
        }
        if (role === "customer") {
            await Appointment.deleteMany({ userId });
            await Review.deleteMany({ userId });
            await AppointmentSummary.deleteMany({ userId })
        }
        res.json("Account deleted Successfully");
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

export default userController;