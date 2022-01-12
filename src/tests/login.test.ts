import { test, expect, describe } from "@jest/globals";
import authReducer from "../redux/authReducer";
import { IAuthState } from "../types";
import { signIn, signOut } from "../redux/actions/authActions";

describe("AuthReducer tests", () => {
  test("success login", () => {
    // arrange
    const name = "Igwarius";
    const action = signIn(name);
    const initialState: IAuthState = {
      isAutorised: false,
      status: 0,
      userName: "",
      description: "",
      img: "",
      role: "",
    };
    // act and assert
    expect(authReducer(initialState, action)).toEqual({
      isAutorised: true,
      status: 0,
      userName: "Igwarius",
      description: "",
      img: "",
      role: "",
    });
  });

  test("faild login", () => {
    // arrange
    const name = "";
    const action = signIn(name);
    const initialState: IAuthState = {
      isAutorised: false,
      status: 0,
      userName: "",
      description: "",
      img: "",
      role: "",
    };
    // act and assert
    expect(authReducer(initialState, action)).toEqual({
      isAutorised: false,
      status: 0,
      userName: "",
      description: "",
      img: "",
      role: "",
    });
  });

  test("success logout", () => {
    // arrange
    const action = signOut;
    const initialStateForLogOut: IAuthState = {
      isAutorised: true,
      status: 0,
      userName: "Igwarius",
      description: "",
      img: "",
      role: "",
    };
    // act and assert
    expect(authReducer(initialStateForLogOut, action)).toStrictEqual({
      isAutorised: false,
      status: 0,
      userName: "",
      description: "",
      img: "",
      role: "",
    });
  });
});
