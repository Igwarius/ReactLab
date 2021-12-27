/* eslint-disable no-param-reassign */
import { createReducer, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { IGame, IGameState } from "@/types";
import { deleteCart, getCart, getProducts, getSearchGames, getThreeGames } from "./thunks/gameThunks";
import { ICart } from "@/components/cart/Cart";

const initialState: IGameState = {
  items: [],
  searchGames: [],
  cart: {
    games: [],
  },
};

export default createReducer(initialState, (builder) =>
  builder
    .addMatcher(
      isAnyOf(getThreeGames.fulfilled, getProducts.fulfilled),
      (state: IGameState, action: PayloadAction<IGame[]>) => {
        state.items = action.payload;
      }
    )
    .addMatcher(
      (action) => action.type === getSearchGames.fulfilled.type,
      (state: IGameState, action: PayloadAction<IGame[]>) => {
        state.searchGames = action.payload;
      }
    )
    .addMatcher(isAnyOf(getCart.fulfilled, deleteCart.fulfilled), (state: IGameState, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    })
);
