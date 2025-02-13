import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export const createSlots = createAsyncThunk("posts/generateSlots", async (formData, { rejectWithValue }) => {
    try {
        await axiosInstance.post("/slots/create", formData, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        toast.success("Slots created Successfully")
        return true
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})
export const getSlots = createAsyncThunk("get/getSlots", async ({ doctorId, date }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/slots/get?doctor=${doctorId}&date=${date}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.error)
    }
})

const slotSlice = createSlice({
    name: "slot",
    initialState: {
        isLoading: false,
        serverError: null,
        paymentPageIsOpen: false,
        detailsPageOpen : false,
        slots: []
    },
    reducers: {
        paymentPageOpen: (state) => {
            state.paymentPageIsOpen = true;
        },
        paymentPageClose: (state) => {
            state.paymentPageIsOpen = false;
        },
        setDetailsPageOpen : ( state ) => {
            state.detailsPageOpen = true;
        },
        setPaymentProcessing: (state, action) => {
            state.paymentProcessing = action.payload;
        },
        setPaymentError: (state, action) => {
            state.paymentError = action.payload;
        }
    },
    extraReducers: (builders) => {
        builders.addCase(createSlots.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(createSlots.fulfilled, (state) => {
            state.isLoading = false;
            state.serverError = null;
        })
        builders.addCase(createSlots.rejected, (state, action) => {
            state.serverError = action.payload;
            state.isLoading = false;
        })

        builders.addCase(getSlots.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(getSlots.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serverError = null;
            state.slots = action.payload.slots;
        })
        builders.addCase(getSlots.rejected, (state, action) => {
            state.serverError = action.payload;
            state.isLoading = false;
            state.slots = [];
        })
    }
})

export const { paymentPageOpen, paymentPageClose, setPaymentError, setPaymentProcessing, setDetailsPageOpen } = slotSlice.actions;
export default slotSlice.reducer;