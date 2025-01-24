import  express  from "express";
import upload from "../multer/multerConfig.js";
import profileController from "../../app/controllers/profileController.js";
import authentication from "../../app/middlewares/authentication.js"
const profileRoute = express.Router();

// Route for the users to complete their profile
profileRoute.post("/user",  authentication, upload.single("profilePic"), profileController.upload );
// Route for the getting user Profile
profileRoute.get("/user", authentication,profileController.getProfile  );


export default profileRoute;