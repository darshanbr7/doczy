import jwt from "jsonwebtoken";
/**
 * This function generates a JWT (JSON Web Token) for a given user.
 * @param {Object} user - The user object for whom the token is being generated. 
 * @returns {string} - Resolves to a signed JWT token string.
*/ 
const generateToken =  async ( user ) => {
    const { JWT_SECRET, JWT_EXPIRE_IN } = process.env;
    try {
        const tokenData = {
            userId : user._id,
            role : user.role,
            name : user.name,
            isVerified : user.isVerified
        }
        const token = await jwt.sign(  tokenData, JWT_SECRET, { expiresIn : JWT_EXPIRE_IN } );
        return token;
    } catch (error) {
        throw new Error ( "something went wrong Error while generating token!")
    }
}

export default generateToken;