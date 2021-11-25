/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IGame } from "@/types";
import { getSearchGames, getThreeGames } from "./thunks/gameThunks";

interface IState {
  games: IGame[];
  searchGames: IGame[];
}

const initialState: IState = {
  games: [],
  searchGames: [],
};

export default createReducer(initialState, {
  [getThreeGames.fulfilled.type]: (state, action) => {
    state.games = action.payload;
  },
  [getSearchGames.fulfilled.type]: (state, action) => {
    state.searchGames = action.payload;
  },
});
