import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGame } from "@/types";
import { getUserNameSelector, isAutorisedSelector } from "@/redux/selectors/authSelectors";
import { addToCart } from "@/redux/thunks/gameThunks";

const useStyles = makeStyles({
  root: {
    border: "2px solid black",
    height: "250px",
    width: "150px",
    margin: "20px",
  },
  img: {
    width: "100%",
    height: "100px",
  },
  header: {
    textAlign: "center",
  },
});

const GameCard = ({ name, img, price, rating }: IGame) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogged = useSelector(isAutorisedSelector);
  const userName = useSelector(getUserNameSelector);

  const onClick = () => {
    if (isLogged) {
      dispatch(addToCart({ name: userName, gameName: name }));
    }
  };

  return (
    <div tabIndex={0} role="button" onClick={onClick} onKeyDown={onClick} className={classes.root}>
      <h3 className={classes.header}> {name}</h3>
      <img className={classes.img} src={img} alt="Poster" />
      <p>price: {price} $</p>
      <Rating name="read-only" value={rating} readOnly />
    </div>
  );
};

export default GameCard;
