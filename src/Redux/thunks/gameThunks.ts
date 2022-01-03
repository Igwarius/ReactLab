import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrls from "@/constants/apiUrls";
import { IGame } from "@/types";

export const GameThunks = {
  GET_THREE_GAMES: "game/getThreeGames",
  GET_SEARCH_GAMES: "game/getSearchGames",
  ADD_TO_CART: "games/addToCart",
  ADD_GAME: "games/addGame",
  DELETE_GAME: "games/deleteGame",
  UPDATE_GAME: "games/updateGame",
};
export interface IProductParameters {
  genre: string;
  age: string;
  param: string;
  type: string;
  name: string;
  platform: string;
}
export interface IAddToCartParameters {
  userName: string;
  gameName: string;
}
export const getThreeGames = createAsyncThunk(GameThunks.GET_THREE_GAMES, async () => {
  const response = await axios.get(apiUrls.GET_THREE_GAMES);

  return response.data;
});
export const getSearchGames = createAsyncThunk(GameThunks.GET_SEARCH_GAMES, async (value: string) => {
  const response = await axios.get(`${apiUrls.GET_GAME_BY_NAME}?name=${value}`);

  return response.data;
});
export const addToCart = createAsyncThunk(GameThunks.ADD_TO_CART, async (values: IAddToCartParameters) => {
  const response = await axios.post(apiUrls.CART, values);

  return response.status;
});
export const addGame = createAsyncThunk(GameThunks.ADD_GAME, async (values: IGame) => {
  const response = await axios.post(apiUrls.GAMES, values);

  return response.status;
});
export const putGame = createAsyncThunk(GameThunks.UPDATE_GAME, async (values: IGame) => {
  const response = await axios.put(apiUrls.GAMES, values);

  return response.status;
});
export const deleteGame = createAsyncThunk(GameThunks.DELETE_GAME, async (values: IGame) => {
  const response = await axios.delete(`${apiUrls.GAMES}?id=${values.id}`);

  return response.status;
});
export const getCart = createAsyncThunk(GameThunks.ADD_TO_CART, async (value: string) => {
  const response = await axios.get(`${apiUrls.CART}?name=${value}`);

  return response.data;
});
export const deleteCart = createAsyncThunk(GameThunks.ADD_TO_CART, async (value: string) => {
  const response = await axios.delete(`${apiUrls.CART}?name=${value}`);

  return response.data;
});
export const getProducts = createAsyncThunk(GameThunks.GET_THREE_GAMES, async (parameters: IProductParameters) => {
  const getProductsLink: string[] = [`${apiUrls.GET_PRODUCTS}?`];

  if (parameters.age) {
    getProductsLink.push(`age=${parameters.age}`);
  }
  if (parameters.genre) {
    getProductsLink.push(`genre=${parameters.genre}`);
  }
  if (parameters.type) {
    getProductsLink.push(`sortDir=${parameters.type}`);
  }
  if (parameters.param) {
    getProductsLink.push(`sortType=${parameters.param}`);
  }
  if (parameters.name) {
    getProductsLink.push(`name=${parameters.name}`);
  }
  if (parameters.platform) {
    getProductsLink.push(`platform=${parameters.platform}`);
  }

  const response = await axios.get(getProductsLink.join("&"));

  return response.data;
});
