import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "..";

const authState = (state: RootState) => state.authReducer;

export const tokenSelect = createSelector(
    [authState],
    (state) => state.token
);

export const userDataSelect = createSelector(
    [authState],
    (state) => state.userData
);

export const authLoadingSelect = createSelector(
    [authState],
    (state) => state.authLoading
);
