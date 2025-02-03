import express from "express";
import { checkSchema } from "express-validator";
import inputValidator from "../../app/helpers/inputValidator.js";
import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js";
import { email, name } from "../../app/validators/reqConstants.js";
import paymentController from "../../app/controllers/paymentController.js";
const paymentRoute = express.Router();

paymentRoute.post( "/create-payment-intent", authentication, authorization(["doctor", "customer"]), paymentController.createPaymentIntent);

export default paymentRoute;