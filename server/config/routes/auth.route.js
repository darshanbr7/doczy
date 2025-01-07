import express from "express";
import { checkSchema } from "express-validator"

import { userRegisterSchema } from "../../app/validators/user_schema_validator.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import authController from "../../app/controllers/auth.controller.js";
const authRoute = express.Router();

authRoute.post( "/signup", checkSchema( userRegisterSchema ), inputValidator, authController.signUp );
export default authRoute;