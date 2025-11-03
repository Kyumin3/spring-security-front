// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.userData;
            state.token= action.payload.token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token= null;
        },
        updateToken: (state,action) => {

            state.token = action.payload
        }
    },
});

export const { loginSuccess, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;