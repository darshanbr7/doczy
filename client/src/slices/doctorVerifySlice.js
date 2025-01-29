import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import {  toast } from "react-toastify"

export const getDoctors = createAsyncThunk( "get/getDoctors", async( {isVerified, page,limit, name}, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get( `/doctor/list?name=${name||""}&verified=${isVerified||false}&page=${page}&limit=${limit||2}`, {
            headers :{
                Authorization: localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (error) {
        return  rejectWithValue( error?.response?.data?.error );
    }
})

export const handleVerification =  createAsyncThunk( "put/handleVerify", async ( { id, isVerified }, { rejectWithValue } ) => {
    try {
        
       const response = await axiosInstance.put ( `/doctor/verify?doctor=${id}`, {isVerified},{
        headers : {
            Authorization : localStorage.getItem("token")
        }
       } ) 
       toast.success( "Dotor status updated!" );
       return response.data;
    } catch (error) {
        return error?.response?.data?.error;
    }
})
const doctorVerifySlice = createSlice( {
    name : "verifyDoctors",
    initialState :{
        items : [],
        currentPage :1,
        totalPages : 1,
        isLoading : false,
        serverError : null
    },
    reducers : {
        setPage : ( state, action ) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers : ( builders ) => {
        builders.addCase( getDoctors.pending, ( state) =>{
            state.isLoading = true;
        })
        builders.addCase( getDoctors.fulfilled, ( state, action ) => {
            state.items = action.payload?.data;
            state.totalPages = action.payload?.totalPages||1;
            state.isLoading = false;
        })
        builders.addCase( getDoctors.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })
        //addcases for the verifying details
        builders.addCase( handleVerification.pending, ( state) =>{
            state.isLoading = true;
        })
        builders.addCase( handleVerification.fulfilled, ( state, action ) => {
            const doctor = action.payload;
            const index = state.items.findIndex( ele => ele._id === doctor._id );
            state.items.splice( index, 1);
            state.isLoading = false;
        })
        builders.addCase( handleVerification.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })
    }
})
export const { setPage } = doctorVerifySlice.actions;
export default doctorVerifySlice.reducer;