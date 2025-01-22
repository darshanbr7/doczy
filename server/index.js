import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./config/routes/authRoute.js";
import profileRoute from "./config/routes/profileRoute.js";
import dbConnect from "./config/db/dbConnection.js";

// Load environment variables from a .env file and make it available on process object
dotenv.config(); 
// Create an instance of an express application, Retrieve the port number from the environment variable
const app = express();
const port  = process.env.PORT  

app.use( cors() );
app.use( express.json() );
// Register authentication-related routes under "/api/auth"
app.use( "/api/auth", authRoutes );
// Profile related routes under "/api/profile"
app.use( "/api/profile", profileRoute );

// Start the server and listen on the specified port
app.listen ( port, ( ) => {
    dbConnect(); 
    console.log(`server is running on the port ${ port }`);
})