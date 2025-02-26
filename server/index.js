import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corn from "node-cron";

import authRoutes from "./config/routes/authRoute.js";
import profileRoute from "./config/routes/profileRoute.js";
import doctorRoute from "./config/routes/doctorRoute.js"
import slotRouter from "./config/routes/slotRoute.js";
import specializationRoute from "./config/routes/specializationRoute.js";
import appointmentRoute from "./config/routes/appointmentRoute.js";
import paymentRoute from "./config/routes/paymentRoute.js"
import reviewRoute from "./config/routes/reviewRoute.js";
import summaryRoute from "./config/routes/summaryRoute.js"

import dbConnect from "./config/db/dbConnection.js";
import appointmentReminder from "./app/helpers/appointmentControllerHelper/appointmentReminder.js";

// Load environment variables from a .env file and make it available on process object
dotenv.config(); 
// Create an instance of an express application, Retrieve the port number from the environment variable
const app = express();
const port  = process.env.PORT  
app.use( express.json() );
app.use( cors() )

/* app.use(cors({
  origin: 'https://doczy.vercel.app', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  credentials: true, // If you need to send cookies or authentication data
}));
app.options('*', cors()); */

// app.use(express.urlencoded({ extended: true }));
// Register authentication-related routes under "/api/auth"
app.use( "/api/auth", authRoutes );
// Profile related routes under "/api/profile"
app.use( "/api/profile", profileRoute );
// Doctor related  routes under "/api/doctor"
app.use( "/api/doctor", doctorRoute );
//specialization related Routes
app.use( "/api/specialization", specializationRoute );
// slot related routes
app.use( "/api/slots", slotRouter );
//payment related routes
app.use( "/api/payment", paymentRoute );
//appointment related routes
app.use( "/api/appointment", appointmentRoute );
// review related routes
app.use( "/api/review", reviewRoute );
//summary related routes
app.use( "/api/summary", summaryRoute );
app.get( "/", ( req, res) => {
  res.send ( "Hello Server")
})
// runninng corn job at 12:00 AM everyday
corn.schedule( '0 0 * * *' , ( ) => {
    appointmentReminder();
})
// Start the server and listen on the specified port
app.listen ( port, ( ) => {
    dbConnect(); 
    console.log(`server is running on the port ${ port }`);
})

export default app;