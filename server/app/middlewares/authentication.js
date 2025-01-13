import jwt from "jsonwebtoken";
/**
 * This is the middleware function to authenticate the user based on the JWT token in the request.
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @param {Function} next - The next middleware function
 * @returns { Function } - If successful, proceeds to the next middleware or route handler by calling `next()`.
    If an error occurs, responds with an appropriate error message and status code.
 */
const authentication = ( req, res, next ) => {
    try {
        let token = req.headers["authorization"];
        if( !token ){
            return res.status( 400 ).json ({ error : "Token is required" } );
        } 
        token = token.split(" ")[ 1 ];
        const secretKey = process.env.JWT_SECRET;
        const isValid = jwt.verify( token, secretKey );
        if( !isValid ) {
            return res.status( 401 ). json ({ error : "Token is invalid "})
        }
        const currentUser = {
            userId : isValid.userId,
            role : isValid.role,
            name : isValid.name,
            isVerified : isValid.isVerified
        }
        req.currentUser = currentUser;
       return next();
    } catch (error) {
        res.status( 500 ).json ( [ { msg : "Something went wrong, Error while authenticating the request" } ] );
    }
}
export default authentication;