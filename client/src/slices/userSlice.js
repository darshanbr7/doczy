import {createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice( {
    name : "user",
    initialState : {
                    userInfo: null,
                    isLoggedIn : false
                  },
    reducers : {
        login : ( state, action ) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout : ( state ) => {
            state.isLoggedIn = false;
            state.user = null ;
        }
    }
})
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;