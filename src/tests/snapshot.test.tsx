import { expect, it } from "@jest/globals";
import React from "react";

import renderer from "react-test-renderer";
import urls from "../constants/urls";

it("main page renders correctly", () => {
  const tree = renderer.create(<a href={urls.MAIN}>link text</a>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("about page renders correctly", () => {
  const tree = renderer.create(<a href={urls.ABOUT}>link text</a>).toJSON();
  expect(tree).toMatchSnapshot();
});
