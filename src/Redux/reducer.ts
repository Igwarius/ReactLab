/* eslint-disable no-param-reassign */
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAutorised: false,
};
export const signIn = createAction("SIGNIN");
export const signOut = createAction("SIGNOUT");
export default createReducer(initialState, {
  [signIn.toString()]: (state: { isAutorised: boolean }) => {
    state.isAutorised = true;
  },
  [signOut.toString()]: (state: { isAutorised: boolean }) => {
    state.isAutorised = false;
  },
});
