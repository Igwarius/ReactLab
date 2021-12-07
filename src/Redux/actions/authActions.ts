import { createAction } from "@reduxjs/toolkit";

export const AuthActions = {
  LOGOUT_USER: "user/logout",
  SIGNIN_USER: "user/signin",
};
export const signIn = createAction(AuthActions.SIGNIN_USER, (userName: string) => ({
  payload: userName,
}));
export const signOut = createAction(AuthActions.LOGOUT_USER);
