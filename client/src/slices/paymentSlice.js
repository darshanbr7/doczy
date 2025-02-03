import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const createCustomerSecret  = createAsyncThunk( "post/paymentCustomerId",  async( formData, { rejectWithValue }  ) => {
    try {
        const response = await axiosInstance.post( "/payment/create-payment-intent",  formData, {
            headers : {
                Authorization : localStorage.getItem( "token" )
            }
        })
        return response.data.clientSecret
    } catch (error) {
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
    }
} )

export default paymentSlice.reducer;