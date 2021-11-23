import { IGame } from "@/types";

interface IGamesThree {
  game: {
    games: IGame[];
  };
}

interface IGamesSearch {
  game: {
    searchGames: IGame[];
  };
}

export const getThreeGamesSelector = (state: IGamesThree) => state.game.games;
export const getSearchGamesSelector = (state: IGamesSearch) => state.game.searchGames;
