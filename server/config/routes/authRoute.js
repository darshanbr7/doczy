import express from "express";
import { checkSchema } from "express-validator"

import { userLoginSchema, userRegisterSchema } from "../../app/validators/userSchemaValidator.js";
import phoneNumberValidator from "../../app/validators/phoneNumberValidator.js";
import emailValidator from "../../app/validators/emailValidator.js";
import inputValidator from "../../app/helpers/inputValidator.js";

import authentication from "../../app/middlewares/authentication.js";

import userController from "../../app/controllers/userController.js";
const authRoute = express.Router();

authRoute.post( "/signUp", checkSchema( userRegisterSchema ), inputValidator, userController.signUp );
authRoute.post ( "/signIn", checkSchema( userLoginSchema ),inputValidator, userController.signIn );
authRoute.post ( "/send-sms", checkSchema( phoneNumberValidator), inputValidator,  userController.sendSmsOtp );
authRoute.post( "/send-email", checkSchema( emailValidator ), inputValidator, userController.sendEmailOtp );
authRoute.post ( "/verify-otp", checkSchema( userLoginSchema ), inputValidator, userController.verifyOtp );
authRoute.get( "/account", authentication, userController.account )
export default authRoute;