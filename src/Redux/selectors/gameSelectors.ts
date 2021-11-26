import { RootState } from "../reduxStore";

export const getThreeGamesSelector = (state: RootState) => state.game.items;
export const getSearchGamesSelector = (state: RootState) => state.game.searchGames;
