import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { tokenSelect, userDataSelect } from "../selectors/auth";
import { RootState } from "..";

export const useAuthSelectors = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

    const token = useAppSelector(tokenSelect);
    const userData = useAppSelector(userDataSelect);

    return {
        token,
        userData
    }
}
