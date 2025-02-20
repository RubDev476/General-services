import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/auth';

import authMiddleware from './middlewares/auth';

export const rootReducer = combineReducers({
    authReducer: authSlice
})

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];