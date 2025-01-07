import express from "express";
const otp_route =  express.Router();
otp_route.get( "/otp", ( req, res ) => {
    res.send( " hello otp");
})
export default otp_route;