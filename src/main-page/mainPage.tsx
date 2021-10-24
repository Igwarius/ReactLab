import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import GameCard from "@/game-card/gameCard";

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
  const getTopThreeGames = async () => {
    const response: AxiosResponse<Array<IGame>> = await axios.get(`http://localhost:8079/top-three-games`);
    setGemes(response.data);
  };

  useEffect(() => {
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
