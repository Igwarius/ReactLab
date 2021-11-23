/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { registrationOrLogin, signIn, signOut } from "./actions/authActions";

interface IState {
  isAutorised: boolean;
  status: number;
}

const initialState: IState = {
  isAutorised: false,
  status: 0,
};

export default createReducer(initialState, {
  [signIn.toString()]: (state: { isAutorised: boolean }) => {
    state.isAutorised = true;
  },
  [signOut.toString()]: (state) => {
    state.isAutorised = false;
    state.status = 0;
  },
  [registrationOrLogin.fulfilled.toString()]: (state, action) => {
    state.status = action.payload;
  },
});
