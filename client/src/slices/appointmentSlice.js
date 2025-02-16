import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export const bookAppointment = createAsyncThunk("post/bookAppointment", async (formData, { rejectWithValue }) => {
    try {
        await axiosInstance.post("/appointment/create", formData, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        toast.success("Appointment booked successfully")
        return true
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const getAppointments = createAsyncThunk("get/getAppointments", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/appointment/list', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const cancelAppointment = createAsyncThunk("put/cancelAppointment", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/appointment/cancel?appointmentId=${id}`, {}, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        toast.success("Appointment has been cancelled");
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const getDoctorAppointments = createAsyncThunk( "get/getDoctorAppointments", async ( formData, {rejectWithValue }) => {
    try {
        const response =  await axiosInstance.get(`/appointment/doctor/list?doctorId=${formData.doctorId}&dateRange=${formData.dateRange}`, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})
const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        isLoading: false,
        serverError: [],
        appointments: [],
        doctorAppointments : []
    },
    extraReducers: (builders) => {
        builders.addCase(bookAppointment.pending, (state) => {
            state.isLoading = true
        })
        builders.addCase(bookAppointment.fulfilled, (state) => {
            state.isLoading = false;
            state.serverError = null;
        })
        builders.addCase(bookAppointment.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })

        builders.addCase(getAppointments.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(getAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.appointments = action.payload;
            state.serverError = null

        })
        builders.addCase(getAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.appointments = []
            state.serverError = action.payload;
        })

        builders.addCase(cancelAppointment.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(cancelAppointment.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.appointments.findIndex(ele => ele._id === action.payload._id);
            state.appointments.splice(index, 1, action.payload);
            state.serverError = null

        })
        builders.addCase(cancelAppointment.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })
        
        builders.addCase(getDoctorAppointments.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(getDoctorAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.doctorAppointments = action.payload;
            state.serverError = null

        })
        builders.addCase(getDoctorAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.doctorAppointments = [];
            state.serverError = action.payload;
        })
    }
})
export default appointmentSlice.reducer;