import { RootState } from "../reduxStore";

export const isAutorisedSelector = (state: RootState) => state.auth.isAutorised;
export const getStatusSelector = (state: RootState) => state.auth.status;
export const getUserNameSelector = (state: RootState) => state.auth.userName;
export const getDescriptionSelector = (state: RootState) => state.auth.description;
export const getImgSelector = (state: RootState) => state.auth.img;
