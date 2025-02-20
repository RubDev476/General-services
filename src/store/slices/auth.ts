import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AuthState } from '@/types/store';

const initialState: AuthState = {
    token: null,
    userData: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            const {token, userData} = action.payload;

            state.token = token;
            state.userData = userData;
        },
        validateSession: (state, action: PayloadAction<AuthState | undefined>) => {
            if(action.payload) {
                const {token, userData} = action.payload;

                state.token = token;
                state.userData = userData;
            }
        },
        logout: (state) => {
            state.token = null;
            state.userData = null;
        },
    },
});

export const { loginSuccess, logout, validateSession } = authSlice.actions;
export default authSlice.reducer;
