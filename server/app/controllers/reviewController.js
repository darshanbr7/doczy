import _ from "lodash";
import Review from "../models/reviewModel.js";
const reviewController = {};

/**
 * This function is used to creates review for a doctor, associating it with the authenticated user.
 * @param {Object} req - Request object with review details and userId.
 * @param {Object} res - Response object with the created review or error.
*/
reviewController.createReview = async (req, res) => {
    try {
        const { doctorId, rating, description } = _.pick(req.body, ["doctorId", "rating", "description"]);
        const { userId } = _.pick(req.currentUser, ["userId"])
        const review = new Review({ userId, doctorId, rating, description });
        await review.save();
        res.json(review);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function fetches and lists all reviews for a specific doctor, sorted by creation date.
 * @param {Object} req - Request object with the `doctorId` in the query parameters.
 * @param {Object} res - Response object with the list of reviews or error.
*/
reviewController.listDoctorReviews = async (req, res) => {
    try {
        const { doctorId } = _.pick(req.query, [ "doctorId" ] );
        const reviews = await Review.find({ doctorId })
            .sort({ createdAt: -1 })
            .populate("userId", "name");
        res.json( reviews );
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function is used to fetches and lists all reviews made by the authenticated user, sorted by creation date.
 * @param {Object} req - Request object with `currentUser` to extract the `userId`.
 * @param {Object} res - Response object with the list of reviews or error.
*/
reviewController.listUserReviews = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, [ "userId" ] );
        const reviews = await Review.find({ userId })
            .sort({ createdAt: -1 })
            .populate("doctorId", "name");
        res.json( reviews );
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function is used to updates an existing review for a doctor, associated with the authenticated user.
 * @param {Object} req - Request object containing the `reviewId`, `rating`, and `description` to update.
 * @param {Object} res - Response object with the updated review or error.
*/
reviewController.updateReview = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, [ "userId" ] );
        const { reviewId } = _.pick(req.query, [ "reviewId" ] );
        const { rating, description } = _.pick(req.body, ["doctorId", "rating", "description"]);
        const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewId, userId },
            { $set: { rating, description } }, 
            { new: true, runValidators : true  } 
        );
    
        if (!updatedReview) {
            return res.status(404).json( { error : [ { msg : "No Reviews found for that id "}]});
        }
        res.json( updatedReview );
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 * This function is used to deletes a review associated with the authenticated user.
 * @param {Object} req - Request object containing `reviewId` and user details.
 * @param {Object} res - Response object with the deleted review or error.
*/
reviewController.deleteReview = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, [ "userId" ] );
        const { reviewId } = _.pick(req.query, [ "reviewId" ] );
        const deletedReview = await Review.findOneAndDelete({ _id: reviewId, userId });
        if( !deletedReview ){
            return res.status(404).json( { error : [ { msg : "No Reviews found for that id "}]});
        }
        res.json( deletedReview );
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}


export default reviewController;