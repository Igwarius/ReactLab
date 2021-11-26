/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IAuthState } from "@/types";
import { signIn, signOut } from "./actions/authActions";
import { registrationOrLogin } from "./thunks/authThunks";

const initialState: IAuthState = {
  isAutorised: false,
  status: 0,
};

export default createReducer(initialState, {
  [signIn.type]: (state) => {
    state.isAutorised = true;
  },
  [signOut.type]: (state) => {
    state.isAutorised = false;
    state.status = 0;
  },
  [registrationOrLogin.fulfilled.type]: (state, action) => {
    state.status = action.payload;
  },
});
