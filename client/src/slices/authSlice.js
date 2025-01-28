import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
/**
 * This function is used to Register the user
 */
export const userRegister = createAsyncThunk( "auth/userRegister",  async ( formData, { rejectWithValue } ) => {
    try {
        await axiosInstance.post("/auth/signUp", formData);
        toast.success( "Email sent for verification!");
        return true;
    } catch (error) {
        console.log( error )
        return rejectWithValue( error?.response?.data?.error )
    }    
})

/**
 * This function is used to verify the user account
 */
export const verifyAccount = createAsyncThunk ( "put/verifyAccount",  async ( { userId, token, isChecked}, { rejectWithValue} ) => {
    try {
        const response = await axiosInstance.put(`/auth/verify?userId=${userId}&token=${token}`, {isVerified: isChecked});
        toast.success("User succesfully verified");
        return response.data;
    } catch (error) {
       return rejectWithValue( error?.response?.data?.error );
    }
})
/**
 * This function is used to Login the user
 */
export const userLogin = createAsyncThunk("user/userLogin", async ( formData, { rejectWithValue} ) => {
    try {
        const response =  await axiosInstance.post("/auth/signIn", formData );
        localStorage.setItem("token", response.data.token );
        toast.success( "User Login successfully");
        return response.data;
    } catch (error) {
        console.log("error", error ) 
        return  rejectWithValue( error?.response?.data?.error );
    }
})

/**
 * This function is used to generate with Email / phone Number OTP
 */
 export const otherLoginOptions = createAsyncThunk( "post/otherLoginOptions", async ( {inputData, state}, { rejectWithValue } ) => {
    try {
       const response = await axiosInstance.post(`/auth/${state}/send-otp`, inputData );
       toast.success( "Otp Sent successfully");
       return response.data; 
    } catch (error) {
        return  rejectWithValue( error?.response?.data?.error );
    }
})
/**
 * This function is used to verify the otp with Email / phone Number 
 */
export const otpVerify = createAsyncThunk( "post/otpVerify", async ( formData, { rejectWithValue } ) => {
    try {
       const response = await axiosInstance.post("/auth/verify-otp", formData );
       localStorage.setItem("token", response.data.token );
       toast.success( "User Login successfully");
       return response.data;
    } catch (error) {
        return  rejectWithValue( error?.response?.data?.error );
    }
})
/**
 * This function is used to get the user details bases on the token
 */
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
        otpSent : false,
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
        builders.addCase( verifyAccount.pending, ( state ) => {
            state.isLoading = true;
        })
        builders.addCase( verifyAccount.fulfilled, ( state ) => {
            state.isLoading = false
            state.serverError = null
        })
        builders.addCase ( verifyAccount.rejected, ( state, action ) => {
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
        builders.addCase( otherLoginOptions.pending, ( state, action ) => {
            state.isLoading = true;
        })
        builders.addCase( otherLoginOptions.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.otpSent = true;
            state.serverError = null;
        })
        builders.addCase( otherLoginOptions.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload
        })
        builders.addCase( otpVerify.pending, ( state, action ) => {
            state.isLoading = true;
        })
        builders.addCase( otpVerify.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.otpSent = false;
            state.serverError = null;
        })
        builders.addCase( otpVerify.rejected, ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload
        })


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
export const {  setLoader, logout  } = authSlice.actions;
export default authSlice.reducer;