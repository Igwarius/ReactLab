import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrls from "@/constants/apiUrls";

export const GameThunks = {
  GET_THREE_GAMES: "game/getThreeGames",
  GET_SEARCH_GAMES: "game/getSearchGames",
};
export interface IProductParameters {
  genre: string;
  age: string;
  param: string;
  type: string;
  name: string;
  platform: string;
}
export const getThreeGames = createAsyncThunk(GameThunks.GET_THREE_GAMES, async () => {
  const response = await axios.get(apiUrls.GET_THREE_GAMES);

  return response.data;
});
export const getSearchGames = createAsyncThunk(GameThunks.GET_SEARCH_GAMES, async (value: string) => {
  const response = await axios.get(`${apiUrls.GET_GAME_BY_NAME}?name=${value}`);

  return response.data;
});

export const getProducts = createAsyncThunk(GameThunks.GET_THREE_GAMES, async (parameters: IProductParameters) => {
  let getProducts = `${apiUrls.GET_PRODUCTS}?`;

  if (parameters.age) {
    getProducts = `${getProducts}age=${parameters.age}&`;
  }
  if (parameters.genre) {
    getProducts = `${getProducts}genre=${parameters.genre}&`;
  }
  if (parameters.type) {
    getProducts = `${getProducts}SortDir=${parameters.type}&`;
  }
  if (parameters.param) {
    getProducts = `${getProducts}sortType=${parameters.param}&`;
  }
  if (parameters.name) {
    getProducts = `${getProducts}name=${parameters.name}&`;
  }
  if (parameters.platform) {
    getProducts = `${getProducts}platform=${parameters.platform}&`;
  }

  const response = await axios.get(getProducts);

  return response.data;
});
