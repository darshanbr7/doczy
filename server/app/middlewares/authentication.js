import jwt from "jsonwebtoken";
/**
 * This is the middleware function to authenticate the user based on the JWT token in the request.
 
 * It ensures that the request is from an authenticated user by performing the following steps:
 * 1. Checks if the `Authorization` header is present in the request. If not, it returns a `400` error with the message "Token is required".
 * 2. Extracts the token from the `Authorization` header and and split it from "Bearer" word .
 * 3. Verifies the extracted token using the `jwt.verify` function with the secret key stored in environment variables.
 * 4. If the token is invalid, it returns a `401` error with the message "Token is invalid".
 * 5. If the token is valid, it extracts the user details (such as `userId`, `role`, `name`, `isVerified`) from the decoded token and assigns them to `req.currentUser`.
 * 6. The middleware then proceeds to the next middleware or route handler by calling `next()`.
 * In case of any error (such as token verification failure), the function returns a `500` error with a generic message "Something went wrong!".
 * @param {Object} req - The request object, which should contain the `Authorization` header with the JWT token.
 * @param {Object} res - The response object used to send back errors or success responses.
 * @param {Function} next - The next middleware function to be executed if the authentication is successful.
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
        res.status( 500 ).json ( { error : "Something went wrong!"})
    }
}
export default authentication;