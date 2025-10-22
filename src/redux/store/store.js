// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // 로그인 상태 관리

const store = configureStore({
    reducer: {
        auth: authReducer,
        // 다른 slice도 여기에 추가 가능
    },
});

export default store;
