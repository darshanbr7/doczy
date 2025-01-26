const docInfoController = {};
import DocInfo from "../models/docInfoModel.js";
import getCoordinates from "../helpers/doctorControllerHelper/getCoordinates.js";

docInfoController.create = async ( req, res ) => {
    try {
        const address = {
            buildingNo: 119,
            street: "1st main Banashankari",
            city : "Bangalore",
            state : "karnataka",
            country : "india",
            pincode : 560028,
        }
        const { latitude, longitude } =  await getCoordinates( address );
        console.log("lat", latitude);
        console.log( "lon", longitude )
        res.end( "hello" )
    } catch ( error ) {
        console.log( error )
        return res.status( 500 ).json( { error : [ { msg : "Something went wrong while creating doctor"}]})
    }   
}

export default docInfoController;