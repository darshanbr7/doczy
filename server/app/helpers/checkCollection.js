import User from "../models/user.model.js";
const checkCollection =  async ( value ) => {
    try {
        const user = await User.findOne( value );
        console.log(  "check collection", value)
        return user;
    } catch (error) {
        throw new Error ( error.message );
    }
}
export default checkCollection;