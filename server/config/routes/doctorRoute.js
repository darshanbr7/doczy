import express from "express";
import { checkSchema } from "express-validator";
import docInfoController from "../../app/controllers/docInfoController.js";
import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js";
import inputValidator from "../../app/helpers/inputValidator.js"
import doctorInfoSchemaValidator from "../../app/validators/doctorInfoValidator.js"
import { userId } from "../../app/validators/queryConstants.js";
import upload from "../multer/multerConfig.js";
const doctorRoute = express.Router();

// Route for creating  doctorInfo 
doctorRoute.post( "/create",  authentication, authorization(["doctor"]), upload.single("licenceImage"), checkSchema( doctorInfoSchemaValidator ), inputValidator,docInfoController.create );

//Route for Getting  doctorInfo
doctorRoute.get( "/detail", authentication, authorization( [ "doctor" ] ),docInfoController.detail );

//Route for Updating doctor info
doctorRoute.put( "/update", authentication, authorization( [ "doctor" ] ), upload.single( "licenceImage"),
 checkSchema( doctorInfoSchemaValidator), inputValidator, docInfoController.update );

 //Route for getting doctor for admin based on the conditions
doctorRoute.get( "/list", authentication, authorization( [ "admin" ] ),docInfoController.list );

//Route for the updating the doctor  verification status
doctorRoute.put( "/verify", authentication, authorization( [ "admin" ]),checkSchema( { doctor : userId } ),inputValidator, docInfoController.verify )

export default doctorRoute;