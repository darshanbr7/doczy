import jwt from "jsonwebtoken";

const generateToken =  async ( user ) => {
    const { JWT_SECRET, JWT_EXPIRE_IN } = process.env;
    try {
        const tokenData = {
            userId : user._id,
            role : user.role,
            isVerified : user.isVerified
        }
        const token = await jwt.sign(  tokenData, JWT_SECRET, { expiresIn : JWT_EXPIRE_IN } );
        return token;
    } catch (error) {
        throw new Error ( "something went wrong!")
    }
}
export default generateToken;