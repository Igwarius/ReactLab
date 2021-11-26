import { RootState } from "../reduxStore";

export const isAutorisedSelector = (state: RootState) => state.auth.isAutorised;
export const getStatusSelector = (state: RootState) => state.auth.status;
