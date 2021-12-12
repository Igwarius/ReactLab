import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrls from "@/constants/apiUrls";

export const GameThunks = {
  GET_THREE_GAMES: "game/getThreeGames",
  GET_SEARCH_GAMES: "game/getSearchGames",
};
export interface IProductParametrs {
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

export const getProducts = createAsyncThunk(GameThunks.GET_THREE_GAMES, async (parametrs: IProductParametrs) => {
  let getProducts = `${apiUrls.GET_PRODUCTS}?`;

  if (parametrs.age) {
    getProducts = `${getProducts}age=${parametrs.age}&`;
  }
  if (parametrs.genre) {
    getProducts = `${getProducts}genre=${parametrs.genre}&`;
  }
  if (parametrs.type) {
    getProducts = `${getProducts}SortDir=${parametrs.type}&`;
  }
  if (parametrs.param) {
    getProducts = `${getProducts}sortType=${parametrs.param}&`;
  }
  if (parametrs.name) {
    getProducts = `${getProducts}name=${parametrs.name}&`;
  }
  if (parametrs.platform) {
    getProducts = `${getProducts}platform=${parametrs.platform}&`;
  }

  const response = await axios.get(getProducts);

  return response.data;
});
