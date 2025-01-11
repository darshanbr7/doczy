import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../utils/axiosInstance";
const userLogin = createAsyncThunk("user/userLogin", async ( ) => {
    try {
        
    } catch (error) {
        
    }
})

const userSlice = createSlice( {
    name : "user",
    initialState : {
                    userInfo: null,
                    isLoggedIn : false
                  },
    reducers : {
        logout : ( state ) => {
            state.isLoggedIn = false;
            state.user = null ;
        }
    },
    extraReducers : ( builders ) => {
        builders.addCase( userLogin.fulfilled , ( state, action ) => {

        })
    }
})
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;