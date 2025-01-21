import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../utils/axiosInstance";

export const userRegister = createAsyncThunk( "auth/userRegister",  async ( formData, { rejectWithValue } ) => {
    try {
        const response = await axiosInstance.post("/auth/signUp", formData);
        console.log( response.data );
        return true;
    } catch (error) {
        console.log( error )
        return rejectWithValue( error?.response?.data?.error )
    }    
})

export const userLogin = createAsyncThunk("user/userLogin", async ( formData, { rejectWithValue} ) => {
    try {
        const response =  await axiosInstance.post("/auth/signIn", formData );
        localStorage.setItem("token", response.data.token );
        return response.data;
    } catch (error) {
        console.log("error", error ) 
        return  rejectWithValue( error?.response?.data?.error );
    }
})

export const getUser = createAsyncThunk( "user/getUser", async ( _, { rejectWithValue} ) =>{
    try {
        const response = await axiosInstance.get("/auth/account",{
        headers :{
            Authorization : localStorage.getItem("token")
        }
        })
        return response.data;
    } catch (error) {   
        return rejectWithValue( error?.response?.data?.error)
    }
})


const authSlice = createSlice( {
    name : "auth",
    initialState : {
        userInfo: null,
        isLoggedIn : false,
        isLoading : false,
        serverError : null 
    },
    reducers : {
        setLoader : ( state ) => {
            state.isLoading = true;
        },
        logout : ( state ) => {
            state.isLoggedIn = false;
            state.user = null ;
        }
    },
    extraReducers : ( builders ) => {
        builders.addCase( userRegister.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( userRegister.fulfilled, ( state ) => {
            state.isLoading = false
            state.serverError = null
        })
        builders.addCase ( userRegister.rejected, ( state, action ) => {
            state.serverError = action.payload;
            state.isLoggedIn = false;
            state.isLoading = false

        })
        builders.addCase( userLogin.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( userLogin.fulfilled , ( state, action ) => {
            state.isLoggedIn = true; 
            state.isLoading = false;
            state.serverError = null;
        });
        builders.addCase( userLogin.rejected, ( state, action ) => {
            state.isLoading = false;
            state.userInfo = null;
            state.isLoggedIn = false;
            state.serverError = action.payload;
        });
        builders.addCase( getUser.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( getUser.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.serverError = false;
            state.isLoggedIn = true;
            state.userInfo = action.payload;
        })
        builders.addCase( getUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
            state.userInfo = null;
            state.isLoggedIn = false;
        })

    }
})
export const {  setLoader, logout } = authSlice.actions;
export default authSlice.reducer;