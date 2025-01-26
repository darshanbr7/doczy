import express from "express";
import { checkSchema } from "express-validator";
import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js";
import specializationController from "../../app/controllers/specializationController.js";
import { name } from "../../app/validators/reqConstants.js";
import inputValidator from "../../app/helpers/inputValidator.js";

const specializationRoute = express.Router();

// Route used to create the Specialization
specializationRoute.post("/create", authentication, authorization(["doctor", "admin" ] ), checkSchema( { name } ), inputValidator,specializationController.create );

// Route used to the list of specialization
specializationRoute.get("/list", authentication, authorization(["doctor", "admin" ] ), specializationController.list );

export default specializationRoute;