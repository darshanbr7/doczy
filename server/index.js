import express from "express";
import dotenv from "dotenv";
import authRoutes from "./config/routes/auth.route.js";
import otp_route from "./config/routes/otp.route.js";
import dbConnect from "./config/db/dbConnection.js";
dotenv.config();
const app = express();
const port  = process.env.PORT
app.use( express.json() );// allow us to parse the incomming request
app.use( "/api/auth", authRoutes );
app.use( "/api/otp", otp_route );
app.listen ( port, ( ) => {
    dbConnect();
    console.log(`server is running on the port ${ port }`);
})