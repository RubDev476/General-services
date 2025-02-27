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
                id_usuarios: 999,
                nombre: "nombre de prueba",
                correo: "test@correo.com",
                tipos_usuario_id: UserType.particular,
                roles: [Roles.cliente],
                imagen: null,
                telefono: "9989898"
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
