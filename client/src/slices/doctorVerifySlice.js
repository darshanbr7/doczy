import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const getDoctors = createAsyncThunk( "get/getDoctors", async( {verified, page,limit}, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get( `/doctor/list?verified=${verified}&page=${page}&limit=&${limit}`, {
            headers :{
                Authorization: localStorage.getItem("token")
            }
        })
        console.log( response.data );
        return response.data;
    } catch (error) {
        return  rejectWithValue( error?.response?.data?.error );
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
    }
})
export const { setPage } = doctorVerifySlice.actions;
export default doctorVerifySlice.reducer;