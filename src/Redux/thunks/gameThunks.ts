import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SetStateAction } from "react";
import urls from "@/constants/urls";

export const GameThunks = {
  GET_THREE_GAMES: "game/getThreeGames",
  GET_SEARCH_GAMES: "game/getSearchGames",
};

export const getThreeGames = createAsyncThunk(GameThunks.GET_THREE_GAMES, async () => {
  const response = await axios.get(urls.GET_THREE_GAMES);

  return response.data;
});
export const getSearchGames = createAsyncThunk(GameThunks.GET_SEARCH_GAMES, async (value: SetStateAction<string>) => {
  const response = await axios.get(`${urls.GET_GAME_BY_NAME}?name=${value}`);

  return response.data;
});
