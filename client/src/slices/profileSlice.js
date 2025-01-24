import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
export const getProfile = createAsyncThunk( "get/getProfile",  async( _, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get("/profile/user",{
            headers: {
                Authorization : localStorage.getItem("token")
            }
        } )
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error )
    }
})

const profileSlice = createSlice( {
    name : "profile",
    initialState :  {
        serverError : null,
        editId : false,
        userDetail : null,
        isLoading : false
    },
    reducers : {
        setEditId : ( state, action ) => {
            state.serverError = null;
            state.editId = action.payload;
            state.userDetail = null;
            state.isLoading = false
        }
    },
    extraReducers : ( builders ) => {
        builders.addCase( getProfile.pending, (  state ) => {
            state.serverError = null;
            state.editId = null ;
            state.userDetail = null;
            state.isLoading = true 
        })
        builders.addCase( getProfile.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.editId = null;
            state.userDetail = action.payload;
            state.isLoading = false 
        })
        builders.addCase( getProfile.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.editId = null;
            state.userDetail = null;
            state.isLoading = false 
        })
    }
})
export const {  setEditId } = profileSlice.actions
export default profileSlice.reducer