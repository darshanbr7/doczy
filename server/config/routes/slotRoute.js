import express from "express";
import { checkSchema } from "express-validator";
import slotController from "../../app/controllers/slotController.js";
import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import slotValidator from "../../app/validators/slotValidator.js";
const slotRouter = express.Router();

slotRouter.post( "/create", authentication, authorization( ["doctor"]), checkSchema( slotValidator ), inputValidator,slotController.create   )

export default slotRouter;