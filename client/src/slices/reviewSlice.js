import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const allCustomerReviews = createAsyncThunk("get/allCustomerReviews", async (doctorId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/review/list?doctorId=${doctorId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        isLoading: false,
        serverError: null,
        customerReviews: []
    },
    extraReducers : ( builders ) => {
        builders.addCase( allCustomerReviews.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( allCustomerReviews.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.serverError = null;
            state.customerReviews = action.payload;
        })
        builders.addCase( allCustomerReviews.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
            state.customerReviews = [];
        })
    }
})
export default reviewSlice.reducer;