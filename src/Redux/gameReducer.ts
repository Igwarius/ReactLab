/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IGame } from "@/types";
import { getThreeGames, getSearchGames } from "@/redux/actions/gameActions";

interface IState {
  games: IGame[];
  searchGames: IGame[];
}

const initialState: IState = {
  games: [],
  searchGames: [],
};

export default createReducer(initialState, {
  [getThreeGames.fulfilled.toString()]: (state, action) => {
    state.games = action.payload;
  },
  [getSearchGames.fulfilled.toString()]: (state, action) => {
    state.searchGames = action.payload;
  },
});
