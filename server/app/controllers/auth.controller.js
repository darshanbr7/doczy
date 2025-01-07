import User from "../models/user.model.js"
import _ from  "lodash";
const authController = {}

authController.signUp =  async ( req, res ) => {
    try {
        const { name, email, role, password, mobile }  = _.pick( req.body, [ "name", "email", "password", "role", "mobile"] );
        const user  = new User ( { name, email, mobile, password  });
        const count =  await User.countDocuments();
        // await user.save();

        console.log(  "count document", count )
        res.json( user );

    } catch (error) {
        return res.status( 500 ). json ( { error :  "something went wrong"})
    }
}

export default authController;