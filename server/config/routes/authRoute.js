import express from "express";
import { checkSchema } from "express-validator"

import { userLoginSchema, userRegisterSchema } from "../../app/validators/userSchemaValidator.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import authentication from "../../app/middlewares/authentication.js";

import userController from "../../app/controllers/userController.js";
import otpController from "../../app/controllers/otpController.js";
import { email, phoneNumber } from "../../app/validators/reqConstants.js";
const authRoute = express.Router();

 // Route for signUp and signIn user.
authRoute.post( "/signUp", checkSchema( userRegisterSchema ), inputValidator, userController.signUp );
authRoute.post ( "/signIn", checkSchema( userLoginSchema ),inputValidator, userController.signIn );

// Route for sending an SMS OTP to the user's phone number and email.
authRoute.post ( "/send-sms", checkSchema( { phoneNumber }), inputValidator,  otpController.sendSmsOtp );
authRoute.post( "/send-email", checkSchema( { email } ), inputValidator, otpController.sendEmailOtp );

// Route for verifying the OTP provided by the user.
authRoute.post ( "/verify-otp", checkSchema( userLoginSchema ), inputValidator, otpController.verifyOtp );

// Route for accessing the user's account details.
authRoute.get( "/account", authentication, userController.account );

export default authRoute;