import express from "express";
import { checkSchema } from "express-validator"

import { userLoginSchema, userRegisterSchema } from "../../app/validators/userSchemaValidator.js";
import phoneNumber from "../../app/validators/constants/phoneNumber.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import email from "../../app/validators/constants/email.js";

import authentication from "../../app/middlewares/authentication.js";

import userController from "../../app/controllers/userController.js";
import otpController from "../../app/controllers/otpController.js";
const authRoute = express.Router();
/**
 * Route for signing up a new user.
 * - Validates user input based on the 'userRegisterSchema' using express-validator's checkschema method.
 * - If validation passes, it calls 'userController.signUp'.
 */
authRoute.post( "/signUp", checkSchema( userRegisterSchema ), inputValidator, userController.signUp );
/**
 * Route for signing in a user.
 * - Validates user input based on the 'userLoginSchema' using express-validator's checkschema method.
 * - If validation passes, it calls 'userController.signIn'.
 */
authRoute.post ( "/signIn", checkSchema( userLoginSchema ),inputValidator, userController.signIn );
/**
 * Route for sending an SMS OTP to the user's phone number.
 * - If validation passes, it calls 'otpController.sendSmsOtp'.
 */
authRoute.post ( "/send-sms", checkSchema( { phoneNumber }), inputValidator,  otpController.sendSmsOtp );
/**
 * Route for sending an email OTP to the user's email.
 * - If validation passes, it calls 'otpController.sendEmailOtp'.
 */
authRoute.post( "/send-email", checkSchema( { email } ), inputValidator, otpController.sendEmailOtp );
/**
 * Route for verifying the OTP provided by the user.
 * - If validation passes, it calls 'otpController.verifyOtp'.
 */
authRoute.post ( "/verify-otp", checkSchema( userLoginSchema ), inputValidator, otpController.verifyOtp );
/**
 * Route for accessing the user's account details.
 * - using "authentication" middleware checking user making  request with valid token
 * - If validation passes, it calls 'userController.account'.
 */
authRoute.get( "/account", authentication, userController.account )
export default authRoute;