import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import detailsReducer from "./slices/doctorDetailsSlice";
import verifyDoctorReducer from "./slices/doctorVerifySlice";
import slotReducer from "./slices/slotSlice";
import customerReducer from "./slices/customerSlice";
import paymentReducer from "./slices/paymentSlice";
import reviewReducer from "./slices/reviewSlice";
import appointmentReducer from "./slices/appointmentSlice";
import summaryReducer  from "./slices/summarySlice";

const store = configureStore( {
    reducer : {
        auth : authReducer,
        profile : profileReducer,
        doctorDetails : detailsReducer,
        VerifyDoctors : verifyDoctorReducer,
        slot : slotReducer,
        customer : customerReducer,
        payment : paymentReducer,
        review : reviewReducer,
        appointment : appointmentReducer,
        summary : summaryReducer
    }
})

export default store;