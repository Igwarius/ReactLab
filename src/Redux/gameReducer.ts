/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";

import { IGameState } from "@/types";
import { getCart, getProducts, getSearchGames, getThreeGames } from "./thunks/gameThunks";

const initialState: IGameState = {
  items: [],
  searchGames: [],
  cart: {
    order: {
      userName: "",
      games: [],
    },
  },
};

export default createReducer(initialState, {
  [getThreeGames.fulfilled.type]: (state, action) => {
    state.items = action.payload;
  },
  [getSearchGames.fulfilled.type]: (state, action) => {
    state.searchGames = action.payload;
  },
  [getProducts.fulfilled.type]: (state, action) => {
    state.items = action.payload;
  },
  [getCart.fulfilled.type]: (state, action) => {
    state.cart = action.payload;
  },
});
