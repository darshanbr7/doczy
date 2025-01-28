const docInfoController = {};
import _ from "lodash";
import DocInfo from "../models/docInfoModel.js";
import getCoordinates from "../helpers/doctorControllerHelper/getCoordinates.js";
import getProfile from "../helpers/profileControllerHelper/getProfile.js";
import uploadMedia from "../helpers/profileControllerHelper/uploadMedia.js";
import getDoctorInfo from "../helpers/doctorControllerHelper/getDoctorInfo.js";

/**
 * This function is used to handles the creation of a new doctor's information/details.
 * 
 * @param {Object} req - The request object, containing user and form data.
 * @param {Object} res - The response object, used to send the result back to the client.
 * @returns {Object} - The function return the doctor info object and sends a response to the client:
 *    - 409 Conflict if the doctor information already exists.
 */
docInfoController.create = async ( req, res ) => {
    try {
        const file = req.file;
        const { userId } = _.pick( req.currentUser, [ "userId" ] );
        const  { specialization, licenceNumber, licenceExpiryDate, yearsOfExperience, address, consultationFee } = _.pick( req.body, [ "specialization", "licenceNumber", "licenceExpiryDate", "yearsOfExperience", "address", "consultationFee"]);
        const doctor = await getDoctorInfo( { userId } );
        if( ! file ) {
            return res.status( 400 ).json( { error : [ {msg : "Licence Image is required"} ] } ); 
        }
        if( doctor ){
            return res.status( 409 ).json( { error : [ {msg : "Doctor information alredy present for this user "} ] } );
        }
        const { _id } = await getProfile( { userId } );
        const docInfo = new DocInfo( { specialization,licenceNumber, licenceExpiryDate, yearsOfExperience, address, consultationFee, profileId: _id } );
        docInfo.userId = userId;
        const fileResult = await uploadMedia( file );
        docInfo.licenceImage = fileResult?.secure_url
        const { latitude, longitude } =  await getCoordinates( address );
        docInfo.address.latitude = latitude;
        docInfo.address.longitude = longitude;
        await docInfo.save();
        console.log( docInfo );
        res.json( docInfo );
    } catch ( error ) {
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong while creating doctor"}]})
    }   
}

/**
 * This function is used to retrieves the details of a doctor's information based on the token.
 * 
 * @param {Object} req - The request object, containing user and form data.
 * @param {Object} res - The response object, used to send the result back to the client.
 * @returns {Object} - The function return the doctor info object and sends a response to the client:
 */
docInfoController.detail = async ( req, res ) => {
    try {
        const { userId } = _.pick( req.currentUser, [ "userId" ] );
        const doctor = await getDoctorInfo( { userId } );
        res.json( doctor);
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong while getting doctor"}]})
    }
}
/**
 * This function is used to updates the doctor's profile information.
 *
 * @param {Object} req - The request object, containing the file  and the doctor's details in the body.
 * @param {Object} res - The response object used to send the updated doctor information or an error message.
 */

docInfoController.update = async ( req, res ) => {
    try {
        const file = req.file;
        const { userId } = _.pick( req.currentUser, [ "userId" ] );
        const  { specialization, licenceNumber, licenceImage, licenceExpiryDate, yearsOfExperience, address, consultationFee } = _.pick( req.body, [ "specialization", "licenceNumber", "licenceImage", "licenceExpiryDate", "yearsOfExperience", "address", "consultationFee"]);
        const doctor = await getDoctorInfo( { userId } );
        if( !doctor ){
            return res.status( 409 ).json( { error : [ {msg : "Doctor information not present for this user "} ] } );
        }
        let fileResult ;
        if( file ){
            fileResult = await uploadMedia( file );
        }
        const updatedDetails = {
            specialization,
            licenceNumber,
            licenceExpiryDate,
            yearsOfExperience,
            consultationFee,
            licenceImage : licenceImage ? licenceImage : fileResult?.secure_url,
            address,
        }
        const { latitude, longitude } =  await getCoordinates( address );
        updatedDetails.address.latitude = latitude;
        updatedDetails.address.longitude = longitude;
        const updatedInfo = await DocInfo.findOneAndUpdate( { userId }, updatedDetails, { new : true, runValidators : true } )
        res.json( updatedInfo );
    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong while updating doctor info "}]})
    }
}

docInfoController.list =  async ( req, res ) => {
    try {
        const { verified, page, limit } = _.pick ( req.query, ["verified", "page", "limit" ] );
        console.log( verified,page, limit )
        const isVerified = { isVerified : verified||false };
        const documentLimit = limit || 1

        const response = await DocInfo.find( isVerified )
        .populate({
            model: "User",
            path : "userId",
            select : "name email phoneNumber",
         })
         .populate({
            model: "Profile",
            path : "profileId",
            select : "avatar",
         })
         .skip( ( page -1) * 1) 
         .limit(documentLimit)
         const total = await DocInfo.countDocuments(isVerified)
        res.json( {
            data :response,
            total,
            page,
            totalPages : Math.ceil( total/documentLimit)
        } );
    } catch (error) {
        console.log( error )
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong while getting doctor info "}]})
    }
}

export default docInfoController;

