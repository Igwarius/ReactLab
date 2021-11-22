/* eslint-disable no-param-reassign */
import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { SetStateAction } from "react";
import urls from "../constants/urls";
import { IGame } from "@/types";
import { ModalType } from "@/constants/globalConstants";
import { IForm } from "../components/modal/ModalWindow";

interface IState {
  isAutorised: boolean;
  games: IGame[];
  searchGames: IGame[];
  status: number;
}

interface IRegistrationParametrs {
  values: IForm;
  typeModal: ModalType | null;
}

const initialState: IState = {
  isAutorised: false,
  games: [],
  searchGames: [],
  status: 0,
};
export const signIn = createAction("SIGNIN");
export const signOut = createAction("SIGNOUT");
export const getThreeGames = createAsyncThunk("game/getThreeGames", async () => {
  const response = await axios.get(urls.GET_THREE_GAMES);

  return response.data;
});
export const getSearchGames = createAsyncThunk("game/getSearchGames", async (value: SetStateAction<string>) => {
  const response = await axios.get(`${urls.GET_GAME_BY_NAME}?name=${value}`);

  return response.data;
});
export const registrationOrLogin = createAsyncThunk(
  "user/registrationOrLogin",
  async ({ typeModal, values }: IRegistrationParametrs) => {
    const response = await axios.post(typeModal !== ModalType.registration ? urls.LOG_IN : urls.REGISTRATION, values);

    return response.status;
  }
);
export default createReducer(initialState, {
  [signIn.toString()]: (state: { isAutorised: boolean }) => {
    state.isAutorised = true;
  },
  [signOut.toString()]: (state) => {
    state.isAutorised = false;
    state.status = 0;
  },
  [getThreeGames.fulfilled.toString()]: (state, action) => {
    state.games = action.payload;
  },
  [getSearchGames.fulfilled.toString()]: (state, action) => {
    state.searchGames = action.payload;
  },
  [registrationOrLogin.fulfilled.toString()]: (state, action) => {
    state.status = action.payload;
  },
});
