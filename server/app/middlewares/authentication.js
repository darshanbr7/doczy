import jwt from "jsonwebtoken";
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
            isVerified : isValid.isVerified
        }
        req.currentUser = currentUser;
        next();
    } catch (error) {
        res.status( 500 ).json ( { error : "Something went wrong!"})
    }
}
export default authentication;