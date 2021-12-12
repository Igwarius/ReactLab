/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { IGameState } from "@/types";
import { getProducts, getSearchGames, getThreeGames } from "./thunks/gameThunks";

const initialState: IGameState = {
  items: [],
  searchGames: [],
  products: [],
};

export default createReducer(initialState, {
  [getThreeGames.fulfilled.type]: (state, action) => {
    state.items = action.payload;
  },
  [getSearchGames.fulfilled.type]: (state, action) => {
    state.searchGames = action.payload;
  },
  [getProducts.fulfilled.type]: (state, action) => {
    state.products = action.payload;
  },
});
