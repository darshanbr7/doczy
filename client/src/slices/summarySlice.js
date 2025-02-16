import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const getConsultationSummary = createAsyncThunk("get/getConsultationSummary", async ( id, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get(`/summary/my-consultation?appointmentId=${id}`, {
            headers :{
                Authorization : localStorage.getItem("token") 
            }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error )
    }
})
export const createSummary = createAsyncThunk("post/createSummary", async ( formData, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.post(`/summary/create`, formData,  {
            headers :{
                Authorization : localStorage.getItem("token") 
            }
        })
        toast.success( "Summary added successfully " )
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error )
    }
})

const summarySlice = createSlice( {
    name : "summary",
    initialState : {
        isLoading : false,
        serverError : [],
        appointmentSummary : {}
    },
    extraReducers :( builders ) =>{
        builders.addCase( getConsultationSummary.pending , (  state ) =>{
            state.isLoading = true;
        })

        builders.addCase( getConsultationSummary.fulfilled , (  state, action ) =>{
            state.isLoading = false;
            state.serverError = [];
            state.appointmentSummary = action.payload;
        })

        builders.addCase( getConsultationSummary.rejected , (  state, action ) =>{
            state.isLoading = false;
            state.serverError = action.payload;
            state.appointmentSummary = {};
        })

        builders.addCase( createSummary.pending , (  state ) =>{
            state.isLoading = true;
        })

        builders.addCase( createSummary.fulfilled , (  state, action ) =>{
            state.isLoading = false;
            state.serverError = [];
        })

        builders.addCase( createSummary.rejected , (  state, action ) =>{
            state.isLoading = false;
            state.serverError = action.payload;
        })
    }
});

export default summarySlice.reducer;