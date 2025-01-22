const doctorController = {}
import User from "../models/userModel.js";

doctorController.list = async ( req, res ) => {
    try {
        const doctors =  await User.find({ role : "doctor", isVerified : true } );
        return res
    } catch (error) {
        res.status( 500 ).json( { error : [ { msg : "Something went wrong while fetching doctors"}]})
    }
}

export default doctorController;