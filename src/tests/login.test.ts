import { test, expect } from "@jest/globals";

import authReducer from "../redux/authReducer";
import { IAuthState } from "../types";
import { signIn, signOut } from "../redux/actions/authActions";

const initialState: IAuthState = {
  isAutorised: false,
  status: 0,
  userName: "",
  description: "",
  img: "",
  role: "",
};
const initialStateForLogOut: IAuthState = {
  isAutorised: true,
  status: 0,
  userName: "Igwarius",
  description: "",
  img: "",
  role: "",
};

test("success login", () => {
  expect(authReducer(initialState, signIn("Igwarius"))).toStrictEqual({
    isAutorised: true,
    status: 0,
    userName: "Igwarius",
    description: "",
    img: "",
    role: "",
  });
});

test("faild login", () => {
  expect(authReducer(initialState, signIn(""))).toStrictEqual({
    isAutorised: false,
    status: 0,
    userName: "",
    description: "",
    img: "",
    role: "",
  });
});
test("success logout", () => {
  expect(authReducer(initialStateForLogOut, signOut)).toStrictEqual({
    isAutorised: false,
    status: 0,
    userName: "",
    description: "",
    img: "",
    role: "",
  });
});
