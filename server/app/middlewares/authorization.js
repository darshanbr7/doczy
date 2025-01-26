/**
 * This is the middleware function to check if the current user has one of the permitted roles for access.
 * @param {Array} permittedRoles - An array of roles that are allowed access to the route.
 * @returns {Function} - A middleware function that checks the user's role and either
 *                       allows the request to proceed or sends a 403 error response.
 */
const authorization = ( premittedRoles ) => {
    return ( req, res, next ) => {
        if( premittedRoles.includes( req.currentUser.role ) ) {
            next();
        } else {
            return res.status( 403 ).json( { error : [ { msg : "Unauthorized access" } ] } );
        }
    }
}
export default authorization;