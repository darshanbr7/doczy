import _ from "lodash";
import Review from "../models/reviewModel.js";
const reviewController = {};

reviewController.create = async (req, res) => {
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

reviewController.list = async (req, res) => {
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

export default reviewController;