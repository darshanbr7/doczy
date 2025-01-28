import DocInfo from "../../models/docInfoModel.js";

/**
 * This function used retrieves the doctor's information based on the provided user ID.
 * 
 * @param { object} userId - The unique identifier of the user (doctor) whose information is to be retrieved.
 * @returns {Object|null} - The doctor's information object, or null if not found.
 * @throws {Error} - Throws an error if there is an issue while querying the database.
 */

const getDoctorInfo = async ( userId ) => {
    try {
        const doctor = await DocInfo.findOne( userId );
        return doctor;
    } catch ( error ) {
        throw error;
    }
}

export default getDoctorInfo;