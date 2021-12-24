import { RootState } from "../reduxStore";

export const getThreeGamesSelector = (state: RootState) => state.game.items;
export const getSearchGamesSelector = (state: RootState) => state.game.searchGames;
export const getCartSelector = (state: RootState) => state.game.cart;
