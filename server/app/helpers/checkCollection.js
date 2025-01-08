import User from "../models/userModel.js";
const checkCollection =  async ( value ) => {
    try {
        const user = await User.findOne( value );
        return user;
    } catch (error) {
        throw new Error ( error.message );
    }
}
export default checkCollection;