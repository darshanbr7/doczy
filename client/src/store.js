import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import detailsReducer from "./slices/doctorDetailsSlice";
import verifyDoctorReducer from "./slices/doctorVerifySlice"

const store = configureStore( {
    reducer : {
        auth : authReducer,
        profile : profileReducer,
        doctorDetails : detailsReducer,
        VerifyDoctors : verifyDoctorReducer
    }
})

export default store;