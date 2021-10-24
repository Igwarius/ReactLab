import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

interface IGame {
  name: string;
  img: string;
  price: number;
  raiting: number;
}

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

const GameCard = (props: IGame) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.header}> {props.name}</h3>
      <img className={classes.img} src={props.img} alt="Poster" />
      <p>{`price: ${props.price} $`}</p>
      <Rating name="read-only" value={props.raiting} readOnly />
    </div>
  );
};

export default GameCard;
