import Profile from "../../models/profileModel.js";

/**
 * This function is used to retrieves a user profile based on the provided user object.
 * 
 * @param {Object} user - The user object used to search for the profile. It contains fields that are matched against the database.
 */
const getProfile = async (user) => {
    try {
        const profile = await Profile.findOne( user );
        return profile;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getProfile;