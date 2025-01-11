import express from "express";
import dotenv from "dotenv";
import authRoutes from "./config/routes/authRoute.js";
import dbConnect from "./config/db/dbConnection.js";
dotenv.config(); // Load environment variables from a .env file and make it available on process object
const app = express();// Create an instance of an express application
const port  = process.env.PORT // Retrieve the port number from the environment variable 
app.use( express.json() );//This is the third party Middleware to parse incoming JSON data in the request body
app.use( "/api/auth", authRoutes );// Register authentication-related routes under "/api/auth"
// Start the server and listen on the specified port
app.listen ( port, ( ) => {
    dbConnect(); // Calling dbConnect function establish a connection to the database when the server starts
    console.log(`server is running on the port ${ port }`);
})