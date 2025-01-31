import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export const createSlots = createAsyncThunk( "posts/generateSlots", async ( formData, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.post( "/slots/create", formData, {
            headers : {
                Authorization : localStorage.getItem("token") 
            }
        })
        toast.success( "Slots created Successfully")
        return true 
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error )
    }
})

const slotSlice = createSlice( {
    name : "slot",
    initialState : {
        isLoading : false,
        serverError : null,
    },
    extraReducers : ( builders ) =>{
        builders.addCase( createSlots.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( createSlots.fulfilled, ( state ) => {
            state.isLoading = false;
            state.serverError = null;
        })
        builders.addCase( createSlots.rejected, ( state, action ) => {
            state.serverError = action.payload;
            state.isLoading = false;
        })
    }
})

export default slotSlice.reducer;