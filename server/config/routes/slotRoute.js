import express from "express";
import { checkSchema } from "express-validator";
import slotController from "../../app/controllers/slotController.js";
import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import {slotValidator, reviverValidate } from "../../app/validators/slotValidator.js";
const slotRouter = express.Router();

// route for creating the slots
slotRouter.post( "/create", authentication, authorization( ["doctor"]), checkSchema( slotValidator ), inputValidator,slotController.create   )

slotRouter.get( "/get", authentication, authorization( [ "doctor", "customer" ] ), checkSchema( reviverValidate ), inputValidator,slotController.getSlots );
export default slotRouter;