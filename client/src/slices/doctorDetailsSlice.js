import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const getSpecializations = createAsyncThunk( "get/getSpecializations", async ( _, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get( "/specialization/list", {
            headers : {
                Authorization :  localStorage.getItem( "token" )
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );   
    }
})

export const createSpecializations = createAsyncThunk( "post/getSpecializations", async ( formData , { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.post( "/specialization/create", {
            headers : {
                Authorization :  localStorage.getItem( "token" )
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );   
    }
})

const detailSlice = createSlice( {
    name : "doctorDetails",
    initialState :{
        details : null,
        specializations : [],
        isLoading : false,
        serverError : null
    },
    reducers : {

    },
    extraReducers : ( builders ) => {
        builders.addCase( getSpecializations.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( getSpecializations.fulfilled, ( state, action ) => {
            state.specializations = action.payload;
            state.isLoading = false;
            state.serverError = null
        })
        builders.addCase( getSpecializations.rejected, ( state, action ) => {
            state.specializations = [];
            state.isLoading = false;
            state.serverError = action.payload
        })

        //addcases for adding specializations 
        builders.addCase( createSpecializations.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( createSpecializations.fulfilled, ( state, action ) => {
            state.specializations.push( createSpecializations );
            state.isLoading = false;
            state.serverError = null
        })
        builders.addCase( createSpecializations.rejected, ( state, action ) => {
            state.specializations = [];
            state.isLoading = false;
            state.serverError = action.payload
        })
    }
})

export default detailSlice.reducer;