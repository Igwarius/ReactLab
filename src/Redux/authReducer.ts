/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { signIn, signOut } from "./actions/authActions";
import { registrationOrLogin } from "./thunks/authThunks";

interface IState {
  isAutorised: boolean;
  status: number;
}

const initialState: IState = {
  isAutorised: false,
  status: 0,
};

export default createReducer(initialState, {
  [signIn.type]: (state: { isAutorised: boolean }) => {
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
