import express from "express";
import { checkSchema } from "express-validator";

import { userId } from "../../app/validators/reqConstants.js";
import appointmentSummaryController from "../../app/controllers/appointmentSummaryController.js";
import upload from "../multer/multerConfig.js";
import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import { appointmentSchemaValidator } from "../../app/validators/appointmentSummaryValidator.js";

const summaryRoute = express.Router();

// route to create the summary
summaryRoute.post ("/create", authentication, authorization(["doctor"]), upload.single("medicalReport"), checkSchema( appointmentSchemaValidator),inputValidator, appointmentSummaryController.createSummary );
//route for the custormer get the consultaion
summaryRoute.get ("/my-consultation", authentication, authorization(["customer"]),  checkSchema( {appointmentId : userId }),inputValidator, appointmentSummaryController.summaryforUser );

export default summaryRoute;