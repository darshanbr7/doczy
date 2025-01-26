import  express  from "express";
import { checkSchema } from "express-validator"
import upload from "../multer/multerConfig.js";
import profileController from "../../app/controllers/profileController.js";
import authentication from "../../app/middlewares/authentication.js"
import inputValidator from "../../app/helpers/inputValidator.js";
import { dob, gender } from "../../app/validators/reqConstants.js";
const profileRoute = express.Router();

// Route for the users to complete their profile
profileRoute.post("/user",  authentication,  upload.single("avatar"),checkSchema( {  gender, dob }),  inputValidator, profileController.upload );
// Route for the getting user Profile
profileRoute.get("/user", authentication,profileController.getProfile  );

profileRoute.put( "/user", authentication, upload.single("avatar"), checkSchema( { gender, dob }), inputValidator, profileController.updateProfile );
export default profileRoute;