import User from "../../models/userModel.js";
/**
 * This function checks if a document matching the given criteria exists in the User collection.
 * @param {Object} value - The search criteria used to find a user document in the collection.
 * @returns {Object|null} - Resolves to the user document if found, or null if no match is found.
*/
const checkCollection =  async ( value ) => {
    try {
        const user = await User.findOne( value );
        return user;
    } catch (error) {
        throw new Error ( error.message );
    }
}
export default checkCollection;