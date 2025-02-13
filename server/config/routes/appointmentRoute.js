import express from "express";
import { checkSchema } from "express-validator";

import appointmentController from "../../app/controllers/appointmentController.js";
import authentication from "../../app/middlewares/authentication.js"
import authorization from "../../app/middlewares/authorization.js"
import inputValidator from "../../app/helpers/inputValidator.js"

import { appointmentSchemaValidator } from "../../app/validators/appointmenetValidator.js";
const appointmentRoute = express.Router();

// route for creating an appointment
appointmentRoute.post( "/create", authentication, authorization(["customer"]),  checkSchema( appointmentSchemaValidator),inputValidator, appointmentController.createAppointment );

appointmentRoute.get( "/list", authentication, authorization(["customer"]),   appointmentController.myAppointments );

appointmentRoute.put( "/cancel", authentication, authorization(["customer"]),   appointmentController.cancelAppointment );

export default appointmentRoute;