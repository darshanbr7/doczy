import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import detailsReducer from "./slices/doctorDetailsSlice";
import verifyDoctorReducer from "./slices/doctorVerifySlice";
import slotReducer from "./slices/slotSlice";
import customerReducer from "./slices/customerSlice"

const store = configureStore( {
    reducer : {
        auth : authReducer,
        profile : profileReducer,
        doctorDetails : detailsReducer,
        VerifyDoctors : verifyDoctorReducer,
        slot : slotReducer,
        customer : customerReducer
    }
})

export default store;