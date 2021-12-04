/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IAuthState } from "@/types";
import { signIn, signOut } from "./actions/authActions";
import { getProfile, registrationOrLogin } from "./thunks/authThunks";

const initialState: IAuthState = {
  isAutorised: false,
  status: 0,
  userName: "",
  description: "",
  img: "",
};

export default createReducer(initialState, {
  [signIn.type]: (state, action) => {
    state.isAutorised = true;
    state.userName = action.payload;
  },
  [signOut.type]: (state) => {
    state.isAutorised = false;
    state.status = 0;
  },
  [registrationOrLogin.fulfilled.type]: (state, action) => {
    state.status = action.payload;
    state.userName = action.meta.arg.values.login;
  },
  [getProfile.fulfilled.type]: (state, action) => {
    state.description = action.payload.user[0].description;
    state.img = action.payload.user[0].img;
  },
});
