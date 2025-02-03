import _ from "lodash";
import stripe from "../../config/stripe/stripe.js";
const paymentController  =  { }

/* paymentController.createPaymentIntent  =  async ( req, res ) => {
    try {
        const { email, name } = _.pick ( req.body, [ "email", "body"])
        const customer = await stripe.customers.create( {
            email ,
            name 
        })
       res.json( { customer_id : customer.id} );
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json( { error :  [ { msg : "Somethingg went wrong while creating Customer"}]})
    }
} */

paymentController.createPaymentIntent  =  async ( req, res ) => {
    try {
        const { amount } = _.pick ( req.body, [ "amount" ])
        const paymentIntent = await stripe.paymentIntents.create( {
            amount: amount,
            currency : "inr"
        })
        res.json({ clientSecret: paymentIntent.client_secret } );
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json( { error :  [ { msg : "Somethingg went wrong while creating Payment Intent"}]})
    }
}

export default paymentController;