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
export const getSlots = createAsyncThunk( "get/getSlots",  async ( { doctorId, date},  { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get( `/slots/get?doctor=${doctorId}&date=${date}`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        console.log( response.data );
        return response.data;
    } catch (error) {
        console.log( error );
        return rejectWithValue( error?.response?.data?.error)
    }
})

const slotSlice = createSlice( {
    name : "slot",
    initialState : {
        isLoading : false,
        serverError : null,
        isOpen : false,
        slots : []
    },
    reducers : {
        paymentPageOpen : ( state ) => {
            state.isOpen = true;
        },
        paymentPageClose  : ( state ) => {
            state.isOpen = false;
        }
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

        builders.addCase( getSlots.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( getSlots.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.serverError = null;
            state.slots = action.payload.slots;
        })
        builders.addCase( getSlots.rejected, ( state, action ) => {
            state.serverError = action.payload;
            state.isLoading = false;
        })
    }
})

export const { paymentPageOpen, paymentPageClose } = slotSlice.actions;
export default slotSlice.reducer;