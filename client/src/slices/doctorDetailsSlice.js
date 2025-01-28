import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

export const createSpecializations = createAsyncThunk( "post/createSpecializations", async ( formData , { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.post( "/specialization/create",  formData, {
            headers : {
                Authorization :  localStorage.getItem( "token" )
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );   
    }
})

export const createDoctorDetails = createAsyncThunk ( "post/createDoctorDetails", async ( formData, { rejectWithValue } ) => {
    try {
        const  response = await axiosInstance.post( "/doctor/create", formData, {
            headers : {
                Authorization : localStorage.getItem( "token" )
            }
        })
        toast.success( "Details created succesfully")
        return response.data;
    } catch (error) {
        console.log( "err create", error )
        return rejectWithValue( error?.response?.data?.error );  
    }
})

export const getDoctorDetails = createAsyncThunk ( "get/getDoctorDetails", async ( _, { rejectWithValue } ) =>{
    try {
        const  response = await axiosInstance.get( "/doctor/detail", {
            headers : {
                Authorization : localStorage.getItem( "token" )
            }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );  
    }
})

export const updateDoctorDetails = createAsyncThunk ( "post/updateDoctorDetails", async ( formData, { rejectWithValue } ) => {
    try {
        const  response = await axiosInstance.put( "/doctor/update", formData, {
            headers : {
                Authorization : localStorage.getItem( "token" )
            }
        })
        toast.success( "Details updated succesfully")
        return response.data;
    } catch (error) {
        console.log( "err update", error )
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
            state.details.push( action.payload );
            state.isLoading = false;
            state.serverError = null
        })
        builders.addCase( createSpecializations.rejected, ( state, action ) => {
            state.specializations = [];
            state.isLoading = false;
            state.serverError = action.payload
        })
        //addcase for creating doctor info
        builders.addCase( createDoctorDetails.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( createDoctorDetails.fulfilled, ( state, action ) => {
            state.details =  action.payload ;
            state.isLoading = false;
            state.serverError = null
        })
        builders.addCase( createDoctorDetails.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload
        })
        //addcase for getting doctor info
        builders.addCase( getDoctorDetails.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( getDoctorDetails.fulfilled, ( state, action ) => {
            state.details = action.payload;
            state.isLoading = false;
            state.serverError = null
        })
        builders.addCase( getDoctorDetails.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })
        //addcases for updating doctorInfo
        builders.addCase( updateDoctorDetails.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( updateDoctorDetails.fulfilled, ( state, action ) => {
            state.details =  action.payload ;
            state.isLoading = false;
            state.serverError = null
        })
        builders.addCase( updateDoctorDetails.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload
        })
    }
})

export default detailSlice.reducer;