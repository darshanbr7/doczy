import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
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
        return response.data;
    } catch (error) {
        console.log(  error );
        return rejectWithValue( error?.response?.data?.error );
    }
})

export const updateProfile = createAsyncThunk( "put/updateProfile", async ( formData, { rejectWithValue }) =>{
    try {
        
    } catch (error) {
        return rejectWithValue( error?.response?.data?.error );
    }
})
const profileSlice = createSlice( {
    name : "profile",
    initialState :  {
        serverError : null,
        userDetail : null,
        isEditing : false,
        isLoading : false
    },
    reducers : {
        setEditing : ( state, action ) => {
            state.serverError = null;
            state.isEditing = true;
            state.userDetail = null;
            state.isLoading = false
        }
        
    },
    extraReducers : ( builders ) => {
        // builders for getting the profile
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
        //builders for upload the profile
        builders.addCase( uploadProfile.pending, (  state ) => {
            state.serverError = null;
            state.editId = null ;
            state.userDetail = null;
            state.isLoading = true 
        })
        builders.addCase( uploadProfile.fulfilled, (  state, action  ) => {
            state.serverError = null;
            state.editId = null;
            state.userDetail = action.payload;
            state.isLoading = false 
        })
        builders.addCase( uploadProfile.rejected, (  state, action  ) => {
            state.serverError = action.payload;
            state.editId = null;
            state.userDetail = null;
            state.isLoading = false 
        })
    }
})
export const {  setEditing } = profileSlice.actions
export default profileSlice.reducer