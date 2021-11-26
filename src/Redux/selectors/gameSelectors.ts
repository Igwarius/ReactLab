import { IGame } from "@/types";

interface IGamesThree {
  game: {
    items: IGame[];
  };
}

interface IGamesSearch {
  game: {
    searchGames: IGame[];
  };
}

export const getThreeGamesSelector = (state: IGamesThree) => state.game.items;
export const getSearchGamesSelector = (state: IGamesSearch) => state.game.searchGames;
