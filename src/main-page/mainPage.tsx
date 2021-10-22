import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import GameCard from "@/game-card/gameCard";

interface IGame {
  name: string;
  img: string;
  price: number;
  raiting: number;
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
  const get3games = async () => {
    const response: AxiosResponse<Array<IGame>> = await axios.get(`http://localhost:8079/top3games`);
    setGemes(response.data);
  };

  useEffect(() => {
    get3games();
  }, []);

  return (
    <>
      <div>Main</div>
      <div>
        <h1 className={classes.header}>Newest games</h1>
        <div className={classes.container}>
          {games.map((element) => (
            <GameCard name={element.name} img={element.img} price={element.price} raiting={element.raiting} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
