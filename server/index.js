import express from "express";
import dotenv from "dotenv";
import authRoutes from "./config/routes/authRoute.js";
import dbConnect from "./config/db/dbConnection.js";
dotenv.config();
const app = express();
const port  = process.env.PORT
app.use( express.json() );// allow us to parse the incomming data
app.use( "/api/auth", authRoutes );
app.listen ( port, ( ) => {
    dbConnect();
    console.log(`server is running on the port ${ port }`);
})