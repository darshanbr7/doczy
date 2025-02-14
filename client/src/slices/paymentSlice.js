import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const createCustomerSecret  = createAsyncThunk( "post/paymentCustomerId",  async( formData, { rejectWithValue }  ) => {
    try {
        const response = await axiosInstance.post( "/payment/create-payment-intent",  formData, {
            headers : {
                Authorization : localStorage.getItem( "token" )
            }
        })
        return response.data.clientSecret
    } catch (error) {
        console.log( error );
        return rejectWithValue( error?.response?.data?.error );
    }
})

export const bookAppointment = createAsyncThunk( "post/bookAppointment", async (  formData, { rejectWithValue}) => {
    try {
        await axiosInstance.post( "/appointment/create", formData, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        toast.success( "Appointment booked successfully")
        return true
    } catch (error) {
        console.log( error )
        return rejectWithValue( error?.response?.data?.error );
    }
})
const paymentSlice = createSlice( { 
    name : "payment",
    initialState : {
        clientSecret: "",
        isLoading :  false,
        serverError : null,
        paymentSuccessed : false
    },
    reducers : {
        setClientSecret : ( state, action ) => {
            state.clientSecret = action.payload ;
        }
    },
    extraReducers : ( builders ) => {
        builders.addCase( createCustomerSecret.pending , ( state ) => {
            state.isLoading = true 
        }) 
        builders.addCase( createCustomerSecret.fulfilled , ( state, action ) => {
            state.isLoading = false;
            state.serverError = null;
            state.clientSecret = action.payload; 
        }) 
        builders.addCase( createCustomerSecret.rejected , ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
            state.clientSecret =  ""; 
        }) 

        builders.addCase( bookAppointment.pending , ( state ) => {
            state.isLoading = true 
        }) 
        builders.addCase( bookAppointment.fulfilled , ( state ) => {
            state.isLoading = false;
            state.serverError = null;
        }) 
        builders.addCase( bookAppointment.rejected , ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
        }) 
    }
} )

export default paymentSlice.reducer;