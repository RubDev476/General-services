import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

import { loginSuccess, logout, validateSession, updateProfile } from "@/store/slices/auth";
import type { LoginData } from "@/types/store";

export function useAuthActions() {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const loginSuccessAction = (data: LoginData) => dispatch(loginSuccess(data));
    const validateSessionAction = () => dispatch(validateSession());
    const logoutAction = () => dispatch(logout());
    const updateProfileAction = (data: LoginData) => dispatch(updateProfile(data));

    return {
        loginSuccessAction,
        logoutAction,
        validateSessionAction,
        updateProfileAction
    };
}
