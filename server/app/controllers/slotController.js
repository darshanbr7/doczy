import _ from "lodash";
const slotController = {};
import Slot from "../models/slotModel.js";

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

export default slotController