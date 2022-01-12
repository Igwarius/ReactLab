import { expect, it, jest, describe } from "@jest/globals";
import { createMemoryHistory } from "history";
import * as redux from "react-redux";
import React from "react";
import { Router } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { Button } from "@material-ui/core";
import Header, { IHeaderProps } from "../components/header/Header";
import Search from "../components/search/Search";

describe("Header snapshot tests", () => {
  it("Should main page renders search", () => {
    // arrange
    const props: IHeaderProps = {
      anchorEl: null,
      onHandleClick: null,
      isLogged: false,
      handleOpenReg: null,
      handleOpenLog: null,
      onLogOut: null,
      onHandleClose: null,
      onLinkClick: null,
      registration: null,
      userName: "",
    };
    const history = createMemoryHistory();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValue(jest.fn());
    useSelectorSpy.mockReturnValue(jest.fn());
    // act
    const tree = TestRenderer.create(
      <Router history={history}>
        <Header {...props} />
      </Router>
    );
    // assert
    expect(tree.root.findByType(Search)).toBeTruthy();
  });
  it("Should main page renders buttons log in buttons", () => {
    // arrange
    const props: IHeaderProps = {
      anchorEl: null,
      onHandleClick: null,
      isLogged: false,
      handleOpenReg: null,
      handleOpenLog: null,
      onLogOut: null,
      onHandleClose: null,
      onLinkClick: null,
      registration: null,
      userName: "",
    };
    const history = createMemoryHistory();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValue(jest.fn());
    useSelectorSpy.mockReturnValue(jest.fn());
    // act
    const tree = TestRenderer.create(
      <Router history={history}>
        <Header {...props} />
      </Router>
    );
    const buttons = tree.root.findAllByType(Button);
    const logInButton = buttons.filter((a) => a._fiber.memoizedProps.children === "Log in");
    const RegistrationButton = buttons.filter((a) => a._fiber.memoizedProps.children === "Registration");
    // assert
    expect(logInButton).toBeTruthy();
    expect(RegistrationButton).toBeTruthy();
  });
  it("Should main page renders buttons log out buttons", () => {
    // arrange
    const props: IHeaderProps = {
      anchorEl: null,
      onHandleClick: null,
      isLogged: true,
      handleOpenReg: null,
      handleOpenLog: null,
      onLogOut: null,
      onHandleClose: null,
      onLinkClick: null,
      registration: null,
      userName: "Igwarius",
    };
    const history = createMemoryHistory();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValue(jest.fn());
    useSelectorSpy.mockReturnValue(jest.fn());
    // act
    const tree = TestRenderer.create(
      <Router history={history}>
        <Header {...props} />
      </Router>
    );
    const buttons = tree.root.findAllByType(Button);
    const logOutButton = buttons.filter((a) => a._fiber.memoizedProps.children === "Log out");
    // asserts
    expect(logOutButton).toBeTruthy();
  });
});
