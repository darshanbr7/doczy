import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const getDoctors = createAsyncThunk( "get/getDoctors", async( formData, { rejectWithValue }) => {
    try {
        console.log( formData );
       /*  const response = await axiosInstance.get( "/all",{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        } )
        return response.data; */
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})

const customerSlice = createSlice( {
    name : "customer",
    initialState : {
        doctors : [],
        currentPage : 1,
        totalPage : 1,
        serverError : null,
        isLoading :  false
    },
    reducers : {
        setPage : ( state, action ) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers : ( builders ) => {
            builders.addCase( getDoctors.pending, ( state ) => {
                state.isLoading = true;
            })
            builders.addCase( getDoctors.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.doctors = action.payload;
                state.serverError = null
            })
            builders.addCase( getDoctors.rejected, ( state, action ) => {
                state.isLoading = false;
                state.doctors = [];
                state.serverError = action.payload;
            })
    }
})

export const { setPage  } = customerSlice.actions
export default customerSlice.reducer;