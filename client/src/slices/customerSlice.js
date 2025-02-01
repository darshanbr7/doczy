import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const getDoctors = createAsyncThunk("get/getDoctors", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/doctor/listed?name=${formData.name}&expertIn=${formData.expertIn }&location=${formData.location}&page=${formData.page}&limit=${formData?.limit}`, {
            params :{
                expertIn : formData.expertIn
            },
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.error);
    }
})

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        doctors: [],
        currentPage: 1,
        totalPages: 1,
        serverError: null,
        isLoading: false
    },
    reducers : {
        setPage : ( state, action ) => {
            state.currentPage = action.payload ;
        },
        
    },
    extraReducers: (builders) => {
        builders.addCase(getDoctors.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(getDoctors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.doctors = action.payload.data;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.totalPages || 1;
            state.serverError = null

        })
        builders.addCase(getDoctors.rejected, (state, action) => {
            state.isLoading = false;
            state.doctors = [];
            state.serverError = action.payload;
        })
    }
})

export const { setPage } = customerSlice.actions;
export default customerSlice.reducer;