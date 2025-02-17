import express from "express";
import { checkSchema } from "express-validator"

import { userLoginSchema, userRegisterSchema } from "../../app/validators/userSchemaValidator.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import authentication from "../../app/middlewares/authentication.js";

import userController from "../../app/controllers/userController.js";
import otpController from "../../app/controllers/otpController.js";
import { email, phoneNumber, userId, token, password } from "../../app/validators/reqConstants.js";
const authRoute = express.Router();

 // Route for signUp and signIn user.
authRoute.post( "/signUp", checkSchema( userRegisterSchema ), inputValidator, userController.signUp );
authRoute.post ( "/signIn", checkSchema( userLoginSchema ),inputValidator, userController.signIn );

//Route for Verifying user
authRoute.put("/verify", checkSchema( { userId, token }), inputValidator,userController.verify );
// Route for sending an SMS OTP to the user's phone number and email.
authRoute.post ( "/phoneNumber/send-otp", checkSchema( { phoneNumber }), inputValidator,  otpController.sendSmsOtp );
authRoute.post( "/email/send-otp", checkSchema( { email } ), inputValidator, otpController.sendEmailOtp );

// Route for verifying the OTP provided by the user.
authRoute.post ( "/verify-otp", checkSchema( userLoginSchema ), inputValidator, otpController.verifyOtp );

// Route for accessing the user's account details.
authRoute.get( "/account", authentication, userController.account );

//route for send the token when user forgot the password
authRoute.post("/forgot-password", checkSchema(  { email } ), inputValidator, userController.forgotPassword );

// route to reset the password
authRoute.post("/reset-password", checkSchema(  { token, userId, newPassword: password } ), inputValidator, userController.resetPassword );

//route to update the password
authRoute.put("/update-password",  authentication, checkSchema({updatedPassword : userRegisterSchema.password }), inputValidator, userController.updatePassword )

//route for delete the account
authRoute.delete("/delete-account",  authentication,  userController.deleteAccount )

export default authRoute;