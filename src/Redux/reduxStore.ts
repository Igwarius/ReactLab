/* eslint-disable import/prefer-default-export */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
