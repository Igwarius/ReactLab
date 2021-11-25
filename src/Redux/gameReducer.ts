/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IGameState } from "@/types";
import { getSearchGames, getThreeGames } from "./thunks/gameThunks";

const initialState: IGameState = {
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
