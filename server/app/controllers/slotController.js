import _ from "lodash";
const slotController = {};
import Slot from "../models/slotModel.js";

/**
 *  This function is used to creates a new set of appointment slots for a doctor on a specified date.
 
 * @param {Object} req - The request object containing `currentUser` (for user authentication) and `body` (for slot data).
 * @param {Object} res - The response object used to send the response back to the client.
 *
 * @returns {Object} - A JSON response containing either a success message or an error message.
 */
slotController.create  = async ( req, res ) => {
    try {
        const { userId } = _.pick( req.currentUser, [ "userId" ] );
        const { slots, date } = _.pick( req.body, [ "slots", "date" ] );
        const targettedDate = new Date( date );
        targettedDate.setUTCHours( 0, 0, 0, 0 )
        const isPresent  =  await Slot.findOne( { doctorId: userId, date : targettedDate } );
        if( targettedDate.getTime() == isPresent?.date.getTime() ){
            return res.status( 409 ).json ( { error : [ { msg : "Slots are already created to that date"}]})
        }
        await  new Slot( { doctorId :   userId, slots, date : targettedDate } ).save();
        res.json( " slot created Successfully")
    } catch (error) {
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong! while creating slot"}]})
    }
}

/**
 * This function used to retrieves the available appointment slots for a specified doctor on a specific date.
 *
 * * @param {Object} req - The request object containing the query parameters `doctor` and `date`.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - A JSON response containing either the slot details or an error message.
 */

slotController.getSlots = async ( req, res ) => {
    try {
        const  {  doctor, date } = _.pick ( req.query, [ "doctor", "date" ] );
        const targettedDate = new Date( date );
        targettedDate.setUTCHours( 0, 0, 0, 0 )
        const slots = await Slot.findOne({ doctorId : doctor, date :targettedDate  });
        if ( !slots ){
            return res.status( 404 ).json( { error : [ { msg : "For that date doctor haven't created slots"}]})
        }
        res.json(  slots )
    } catch (error) {
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong while getting slots"}]})
    }
}
export default slotController