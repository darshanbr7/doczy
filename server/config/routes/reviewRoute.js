import express from "express";
import { checkSchema } from "express-validator";

import authentication from "../../app/middlewares/authentication.js";
import authorization from "../../app/middlewares/authorization.js"
import { reviewValidatorSchema } from "../../app/validators/reviewSchemaValidator.js";
import inputValidator from "../../app/helpers/inputValidator.js";
import reviewController from "../../app/controllers/reviewController.js";
import { userId } from "../../app/validators/queryConstants.js";

const reviewRoute = express.Router();
// route for creating review
reviewRoute.post("/create", authentication, authorization(["customer"]),checkSchema(reviewValidatorSchema), inputValidator, reviewController.createReview );

// route for getting based on doctorID
reviewRoute.get("/list", authentication, authorization(["customer"]), checkSchema({ doctorId : userId }), inputValidator,reviewController.listDoctorReviews );

// route for getting reviews based on the userId
reviewRoute.get("/my-reviews", authentication, authorization(["customer"]),reviewController.listUserReviews );

// route to update the review
reviewRoute.put("/update-review", authentication, authorization(["customer"]),checkSchema(reviewValidatorSchema), inputValidator, reviewController.updateReview );

// route to delete the review
reviewRoute.delete("/delete-review", authentication, authorization(["customer"]),checkSchema({ reviewId : userId}), inputValidator, reviewController.deleteReview );

export default reviewRoute;