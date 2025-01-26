import express from "express";
import docInfoController from "../../app/controllers/docInfoController.js";
const doctorRoute = express.Router();

doctorRoute.post( "/create", docInfoController.create );

export default doctorRoute;