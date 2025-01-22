import  express  from "express";
import upload from "../multer/multerConfig.js";
import profileController from "../../app/controllers/profileController.js";
const profileRoute = express.Router();

profileRoute.post("/upload", upload.single("profilePic"), profileController.upload );

export default profileRoute;