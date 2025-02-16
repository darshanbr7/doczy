import express from "express";
import { checkSchema } from "express-validator";

import appointmentController from "../../app/controllers/appointmentController.js";
import authentication from "../../app/middlewares/authentication.js"
import authorization from "../../app/middlewares/authorization.js"
import inputValidator from "../../app/helpers/inputValidator.js"
import { userId, dateRange } from "../../app/validators/queryConstants.js";

import { appointmentSchemaValidator } from "../../app/validators/appointmenetValidator.js";
const appointmentRoute = express.Router();

// route for creating an appointment
appointmentRoute.post( "/create", authentication, authorization(["customer"]),  checkSchema( appointmentSchemaValidator),inputValidator, appointmentController.createAppointment );

// routes for getting  all the appointments booked by user
appointmentRoute.get( "/list", authentication, authorization(["customer"]),   appointmentController.myAppointments );

// route for cancel appointment
appointmentRoute.put( "/cancel", authentication, authorization(["customer"]), checkSchema( { appointmentId : userId }),inputValidator,   appointmentController.cancelAppointment );

// route for doctor to get the all appointments
appointmentRoute.get("/doctor/list", authentication, authorization(["doctor"]), checkSchema( {doctorId : userId, dateRange }), inputValidator, appointmentController.doctorSpecificAppointments )
/* appointmentRoute.get("/doctor/list", authentication, authorization(["doctor"]), checkSchema( {doctorId : userId, dateRange }), inputValidator, appointmentController.doctorSpecificAppointments ) */

export default appointmentRoute;