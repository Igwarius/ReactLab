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
  role: "",
};

const authReducer = createReducer(initialState, {
  [signIn.type]: (state, action) => {
    if (action.payload) {
      state.isAutorised = true;
    }
    state.userName = action.payload;
  },
  [signOut.type]: (state) => {
    state.isAutorised = false;
    state.status = 0;
    state.role = "";
    state.userName = "";
  },
  [registrationOrLogin.fulfilled.type]: (state, action) => {
    state.status = action.payload.status;
    state.role = action.payload.data.role;
    state.userName = action.meta.arg.values.login;
  },
  [getProfile.fulfilled.type]: (
    state,
    {
      payload: {
        user: { description, img },
      },
    }
  ) => {
    state.description = description;
    state.img = img;
  },
});
export default authReducer;
