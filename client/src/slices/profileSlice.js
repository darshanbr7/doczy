import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
export const getProfile = createAsyncThunk( "get/getProfile",  async( _, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.get("/profile/user",{
            headers: {
                Authorization : localStorage.getItem("token"),    
            }
        } )
        return response.data;
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})

export const uploadProfile = createAsyncThunk("post/uploadProfile", async ( formData, { rejectWithValue } ) =>{
    try {
        const response = await axiosInstance.post("/profile/user", formData ,{
            headers: {
                Authorization : localStorage.getItem("token"),
            }
        } )
        toast.success( "Profile uploded successfully")
        return response.data;   
    } catch (error) {
        console.log(  error );
        return rejectWithValue( error?.response?.data?.error );
    }
})

export const updateProfile = createAsyncThunk( "put/updateProfile", async ( formData, { rejectWithValue }) =>{
    try {
        const response = await axiosInstance.put("/profile/user", formData ,{
            headers: {
                Authorization : localStorage.getItem("token"),
            }
        } )
        toast.success( "Profile updated successfully")
        return response.data;
    } catch (error) {
        console.log( "errorp", error)
        return rejectWithValue( error?.response?.data?.error );
    }
})

export const updatePassword = createAsyncThunk ( "put/updatePassword",  async (formdata, { rejectWithValue } ) => {
    try {
        await axiosInstance.put("/auth/update-password", formdata,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        toast.success( "Password Updated Successfully")
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})
export const deleteAccount = createAsyncThunk ( "put/deleteAccount",  async (_, { rejectWithValue } ) => {
    try {
        await axiosInstance.delete("/auth/delete-account",{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        toast.success( "Account Deleted Successfully")
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})
const profileSlice = createSlice( {
    name : "profile",
    initialState :  {
        serverError : null,
        userDetail : null,
        isLoading : false,
        paymentError : null,
        paymentProcessing : false
    },
   
    extraReducers : ( builders ) => {
        // builders for getting the profile
        builders.addCase( getProfile.pending, (  state ) => {
            state.serverError = null;
            state.userDetail = null;
            state.isLoading = true 
        })
        builders.addCase( getProfile.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.userDetail = action.payload;
            state.isLoading = false 
        })
        builders.addCase( getProfile.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.userDetail = null;
            state.isLoading = false 
        })
        //builders for upload the profile
        builders.addCase( uploadProfile.pending, (  state ) => {
            state.serverError = null;
            state.userDetail = null;
            state.isLoading = true 
        })
        builders.addCase( uploadProfile.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.userDetail = action.payload;
            state.isLoading = false 
        })
        builders.addCase( uploadProfile.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.userDetail = null;
            state.isLoading = false 
        })

        //builders for update the profile
        builders.addCase( updateProfile.pending, (  state ) => {
            state.serverError = null;
            state.userDetail = null;
            state.isLoading = true 
        })
        builders.addCase( updateProfile.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.userDetail = action.payload;  
            state.isLoading = false 
        })
        builders.addCase( updateProfile.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.isLoading = false 
        })

        builders.addCase( updatePassword.pending, (  state ) => {
            state.isLoading = true 
        })
        builders.addCase( updatePassword.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.isLoading = false 
        })
        builders.addCase( updatePassword.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.isLoading = false 
        })
        builders.addCase( deleteAccount.pending, (  state ) => {
            state.isLoading = true 
        })
        builders.addCase( deleteAccount.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.isLoading = false 
        })
        builders.addCase( deleteAccount.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.isLoading = false 
        })
    }
})
export const {  setEditing, } = profileSlice.actions
export default profileSlice.reducer