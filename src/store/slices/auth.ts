import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, LoginData } from '@/types/store';
import { UserType, Roles } from '@/types/forms';

const initialState: AuthState = {
    token: null,
    userData: null,
    authLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fakeLogin: (state) => {
            state.userData = {
                id_usuario: 999,
                username: "nombre de prueba",
                email: "test@correo.com",
                exp: 246246,
                iat: 24624624,
                type: UserType.particular,
                roles: [Roles.cliente]
            }
        },
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
        logout: (state) => {
            state.token = null;
            state.userData = null;
        },
    },
});

export const { loginSuccess, logout, validateSession, fakeLogin } = authSlice.actions;
export default authSlice.reducer;
