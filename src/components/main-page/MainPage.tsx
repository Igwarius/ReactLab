import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "@/components/game-card/GameCard";
import { IGame } from "@/types";
import { getThreeGamesSelector } from "@/redux/selectors/gameSelectors";

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
  const dispatch = useDispatch();

  const [isOnline, setIsOnline] = useState(false);
  let games: IGame[] = [];
  games = useSelector(getThreeGamesSelector);
  useEffect(() => {
    if (!isOnline) {
      dispatch(getThreeGamesSelector);
      setIsOnline(true);
    }
  });

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
