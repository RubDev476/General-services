import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { tokenSelect, userDataSelect, authLoadingSelect } from "../selectors/auth";
import { RootState } from "..";

export const useAuthSelectors = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

    const token = useAppSelector(tokenSelect);
    const userData = useAppSelector(userDataSelect);
    const authLoading = useAppSelector(authLoadingSelect);

    return {
        token,
        userData,
        authLoading
    }
}
