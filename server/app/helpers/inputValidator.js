import { validationResult } from "express-validator";
const inputValidator = ( req, res, next ) => {
    try {
        const errors = validationResult( req );
        if( !errors.isEmpty() ){
            return res.status( 400 ).json( { error : errors.array() })
        } 
        next();
    } catch( error ) {
        throw new Error ( error.message );
    }
}
export default inputValidator;