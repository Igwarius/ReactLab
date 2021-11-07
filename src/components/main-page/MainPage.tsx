import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import GameCard from "@/components/game-card/GameCard";
import Urls from "@/constants/urls";
import { IGame } from "@/types";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

const Main = () => {
  const classes = useStyles();
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getTopThreeGames = async () => {
      const response: AxiosResponse<IGame[]> = await axios.get(Urls.GET_THREE_GAMES);
      setGames(response.data);
    };

    getTopThreeGames();
  }, []);

  return (
    <>
      <div>Main</div>
      <div>
        <h1 className={classes.header}>Newest games</h1>
        <div className={classes.container}>
          {games.map((element) => (
            <GameCard {...element} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;