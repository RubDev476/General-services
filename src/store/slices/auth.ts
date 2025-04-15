import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, LoginData } from '@/types/store';

export const initialState: AuthState = {
    token: null,
    userData: null,
    authLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginData>) => {
            const {token, userData} = action.payload;

            state.token = token;
            state.userData = userData;
        },
        validateSession: (state, action: PayloadAction<LoginData | undefined>) => {
            if(action.payload) {
                const {token, userData} = action.payload;

                state.token = token;
                state.userData = userData;
            }

            state.authLoading = false;
        },
        updateProfile: (state, action: PayloadAction<LoginData>) => {
            const {token, userData} = action.payload;

            state.token = token;
            state.userData = userData;
        },
        logout: (state) => {
            state.token = null;
            state.userData = null;
        },
    },
});

export const { loginSuccess, logout, validateSession, updateProfile } = authSlice.actions;
export default authSlice.reducer;
