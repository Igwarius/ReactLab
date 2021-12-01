/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IAuthState } from "@/types";
import { signIn, signOut } from "./actions/authActions";
import { changePassword, getProfile, registrationOrLogin, saveProfile } from "./thunks/authThunks";
import { IS_AUTHORIZED_KEY } from "@/constants/globalConstants";

const initialState: IAuthState = {
  isAutorised: false,
  status: 0,
  userName: "",
  description: "",
  img: "",
};

export default createReducer(initialState, {
  [signIn.type]: (state) => {
    state.isAutorised = true;
    if (localStorage.getItem(IS_AUTHORIZED_KEY)) {
      state.userName = localStorage.getItem(IS_AUTHORIZED_KEY)!;
    }
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

  [changePassword.fulfilled.type]: () => {},

  [saveProfile.fulfilled.type]: () => {},
});
