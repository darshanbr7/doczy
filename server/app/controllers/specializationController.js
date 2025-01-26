const specializationController = {}
import _ from "lodash"
import Specialization from "../models/specializationModel.js";

/**
 * This function handles the creation of a new specialization for a doctors.
 * @param {Object} req - The request object, which contains the user input (body) 
 *                       and user session (currentUser).
 * @param {Object} res - The response object, used to send back the result or 
 *                       error response to the client.
 * 
 * @returns {Object} - A JSON response containing either the created specialization 
 *                     or an error message.
 */
specializationController.create = async( req, res ) => {
    try {
        const { name } = _.pick( req.body, [ "name" ] );
        const { userId } = _.pick( req.currentUser, ["userId"]);
        const specialization = await new Specialization( { userId, name } ).save();
        return res.json(  specialization );
    } catch (error) {
        return res.status( 500 ).json( { error : [ { msg : "something went wrong while creating specialization "} ] } );
    }
}

/**
 * This function used retrieves and returns a list of all specializations.
 * @param {Object} req - The request object. In this case, it doesn't contain 
 *                       any parameters specific to the request.
 * @param {Object} res - The response object, used to send back the list of 
 *                       specializations or an error message to the client.
 * @returns {Object} - A JSON response containing either an array of specializations 
 *                     or an error message if something goes wrong.
 */
specializationController.list =  async ( req, res ) => {
    try {
        const specializations = await Specialization.find();
        return res.json( specializations );
    } catch (error) {
        return res.status( 500 ).json( { error : [ { msg : "something went wrong while getting specialization "} ] } ); 
    }
}

export default specializationController;