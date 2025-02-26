const docInfoController = {};
import _ from "lodash";
import DocInfo from "../models/docInfoModel.js";
import getCoordinates from "../helpers/doctorControllerHelper/getCoordinates.js";
import getProfile from "../helpers/profileControllerHelper/getProfile.js";
import uploadMedia from "../helpers/profileControllerHelper/uploadMedia.js";
import getDoctorInfo from "../helpers/doctorControllerHelper/getDoctorInfo.js";
import { aggrigatorForAdmin, aggrigatorForCustomer } from "../helpers/doctorControllerHelper/aggrigator.js";

/**
 * This function is used to handles the creation of a new doctor's information/details.
 * 
 * @param {Object} req - The request object, containing user and form data.
 * @param {Object} res - The response object, used to send the result back to the client.
 * @returns {Object} - The function return the doctor info object and sends a response to the client:
 *    - 409 Conflict if the doctor information already exists.
 */
docInfoController.create = async (req, res) => {
    try {
        const file = req.file;
        const { userId } = _.pick(req.currentUser, ["userId"]);
        const { specialization, licenceNumber, licenceExpiryDate, yearsOfExperience, address, consultationFee } = _.pick(req.body, ["specialization", "licenceNumber", "licenceExpiryDate", "yearsOfExperience", "address", "consultationFee"]);
        const doctor = await getDoctorInfo({ userId });
        if (!file) {
            return res.status(400).json({ error: [{ msg: "Licence Image is required" }] });
        }
        if (doctor) {
            return res.status(409).json({ error: [{ msg: "Doctor information alredy present for this user " }] });
        }
        const { _id } = await getProfile({ userId });
        const docInfo = new DocInfo({ specialization, licenceNumber, licenceExpiryDate, yearsOfExperience, address, consultationFee, profileId: _id });
        docInfo.userId = userId;
        const fileResult = await uploadMedia(file);
        docInfo.licenceImage = fileResult?.secure_url
        const { latitude, longitude } = await getCoordinates(address);
        docInfo.address.latitude = latitude;
        docInfo.address.longitude = longitude;
        await docInfo.save();
        console.log(docInfo);
        res.json(docInfo);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong while creating doctor" }] })
    }
}

/**
 * This function is used to retrieves the details of a doctor's information based on the token.
 * 
 * @param {Object} req - The request object, containing user and form data.
 * @param {Object} res - The response object, used to send the result back to the client.
 * @returns {Object} - The function return the doctor info object and sends a response to the client:
 */
docInfoController.detail = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, ["userId"]);
        const doctor = await getDoctorInfo({ userId });
        res.json(doctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: [{ msg: "Something went wrong while getting doctor" }] })
    }
}
/**
 * This function is used to updates the doctor's profile information.
 *
 * @param {Object} req - The request object, containing the file  and the doctor's details in the body.
 * @param {Object} res - The response object used to send the updated doctor information or an error message.
 */

docInfoController.update = async (req, res) => {
    try {
        const file = req.file;
        const { userId } = _.pick(req.currentUser, ["userId"]);
        const { specialization, licenceNumber, licenceImage, licenceExpiryDate, yearsOfExperience, address, consultationFee } = _.pick(req.body, ["specialization", "licenceNumber", "licenceImage", "licenceExpiryDate", "yearsOfExperience", "address", "consultationFee"]);
        const doctor = await getDoctorInfo({ userId });
        if (!doctor) {
            return res.status(409).json({ error: [{ msg: "Doctor information not present for this user " }] });
        }
        let fileResult;
        if (file) {
            fileResult = await uploadMedia(file);
        }
        const updatedDetails = {
            specialization,
            licenceNumber,
            licenceExpiryDate,
            yearsOfExperience,
            consultationFee,
            licenceImage: licenceImage ? licenceImage : fileResult?.secure_url,
            address,
        }
        const { latitude, longitude } = await getCoordinates(address);
        updatedDetails.address.latitude = latitude;
        updatedDetails.address.longitude = longitude;
        const updatedInfo = await DocInfo.findOneAndUpdate({ userId }, updatedDetails, { new: true, runValidators: true })
        res.json(updatedInfo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: [{ msg: "Something went wrong while updating doctor info " }] })
    }
}

/**
 * This function is used to list doctors based on filters and pagination parameters.
 *
 * This function retrieves a list of doctors from the database, applying filters like doctor name and verification status
 * along with pagination (page and limit). It constructs an aggregation pipeline based on the filters, performs the query 
 * using MongoDB's aggregation framework, and returns the result along with metadata such as the total number of results 
 * @param {Object} req - The request object containing query parameters for filtering and pagination.
 * @param {Object} res - The response object used to send back the doctor data and pagination metadata.
 */
docInfoController.list = async (req, res) => {
    try {
        const { name, verified, page, limit, } = _.pick(req.query, ["name", "verified", "page", "limit"]);
        const isVerified = verified === "true" ? true : false;
        const pageNumber = parseInt(page) || 1;
        const pageLimit = parseInt(limit) || 2;
        const skip = (pageNumber - 1) * pageLimit;
        const pipeLine = aggrigatorForAdmin({ name, isVerified, skip, pageLimit })

        const response = await DocInfo.aggregate(pipeLine)
        const total = await DocInfo.countDocuments({
            isVerified,
            ...(name && { "user.name": { $regex: name, $options: "i" } })
        });
        res.json({
            data: response,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / pageLimit)
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: [{ msg: "Something went wrong while getting doctor info " }] })
    }
}

/**
 *  this is the functions for admin to verify a doctor's verification status.

 * @param {Object} req - The request object containing the doctor ID as a query parameter and verification status (`isVerified`) in the body.
 * @param {Object} res - The response object used to send back the updated doctor data or error response.
 */
docInfoController.verify = async (req, res) => {
    try {
        const { doctor } = _.pick(req.query, ["doctor"]);
        const { isVerified } = _.pick(req.body, ["isVerified"]);
        const updated = await DocInfo.findByIdAndUpdate(doctor, { isVerified }, { new: true, runValidators: true })
        console.log(updated)
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: [{ msg: "Something went wrong while verifying doctor" }] })
    }
}

/**
 * This  function handles fetching a list of doctors based on the given query parameters which are vrified by admin.
 * 
 * @param {Object} req - The request object containing query parameters (`name`, `location`, `expertIn`, `page`, `limit`).
 * @param {Object} res - The response object used to send the response to the client.
 */
docInfoController.availableForCustomer = async (req, res) => {
    try {
        const { name, location, expertIn, page, limit } = _.pick(req.query, ["name", "location", "expertIn", "page", "limit"]);
        const specialization = expertIn
        const isVerified = true;
        const pageNumber = parseInt(page) || 1;
        const pageLimit = parseInt(limit) || 2;
        const skip = (pageNumber - 1) * pageLimit;

        const pipeLine = aggrigatorForCustomer({ name, specialization, location, isVerified, skip, pageLimit });

        const response = await DocInfo.aggregate(pipeLine);
        const total = await DocInfo.countDocuments({
            isVerified,
            ...(name && { "user.name": { $regex: name, $options: "i" } }),
            ...(location && {
                $or: [
                    { "address.city": { $regex: location, $options: "i" } },
                    { "address.street": { $regex: location, $options: "i" } }
                ]
            })
        });

        res.json({
            data: response,
            total,
            page: Number(page) || 1,
            totalPages: Math.ceil(total / pageLimit)
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: [{ msg: "Something went wrong while getting doctor info " }] })
    }
}

/**
 * This function used to retrieves a single doctor's information based on the provided doctorId.
 *
 * @param {Object} req - Express request object containing doctorId in query parameters.
 * @param {Object} res - Express response object to return the doctor's details or errors.
 *
 * @returns {Object} - JSON response with doctor details or an error message.
 */
docInfoController.getSingleDoctorInfo = async (req, res) => {
    try {
        const { doctorId } = _.pick(req.query, ["doctorId"]);
        const response = await DocInfo.findOne({ userId: doctorId })
            .populate({
                path: "userId",
                select: "name"
            })
            .populate({
                path: "profileId",
                select: "avatar"
            });
        
        if (!response) {
            return res.status(404).json({ error: [{ msg: "Doctor not found" }] });
        }
        
        res.json(response);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong while getting doctor information" }] });
    }
};

export default docInfoController;

