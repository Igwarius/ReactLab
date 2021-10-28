import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import GameCard from "@/game-card/gameCard";
import Urls from "@/constants/urls";

interface IGame {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
}

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
  const [games, setGemes] = useState<IGame[]>([]);

  useEffect(() => {
    const getTopThreeGames = async () => {
      const response: AxiosResponse<IGame[]> = await axios.get(Urls.GET_THREE_GAMES);
      setGemes(response.data);
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
            <GameCard
              key={element.id}
              name={element.name}
              img={element.img}
              price={element.price}
              rating={element.rating}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
