import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button, makeStyles } from "@material-ui/core";
import { deleteCart, getCart } from "@/redux/thunks/gameThunks";
import { getCartSelector } from "@/redux/selectors/gameSelectors";
import { IS_AUTHORIZED_KEY } from "@/constants/globalConstants";

const useStyles = makeStyles({
  table: {
    height: "400px",
    width: "100%",
  },
});

const Cart = () => {
  const classes = useStyles();
  const [selectedGame, setSelectedGame] = useState([]);
  const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);

  let totalPrice = 0;
  const onDeleteSelectedGame = () => {
    const filteredFileList = games.filter((item) => !selectedGame.includes(item.id));
    setGames(filteredFileList);
  };
  const OnBuy = () => {
    dispatch(deleteCart(localStorage.getItem(IS_AUTHORIZED_KEY)));
    dispatch(getCart(localStorage.getItem(IS_AUTHORIZED_KEY)));
    setGames([]);
  };
  const columns = [
    { field: "name", headerName: "Game" },
    { field: "price", headerName: "Price" },
    { field: "genre", headerName: "Genre" },
    { field: "platform", headerName: "Platform" },
  ];

  games.forEach((game) => {
    totalPrice = game.price + totalPrice;
  });
  useEffect(() => {
    dispatch(getCart(localStorage.getItem(IS_AUTHORIZED_KEY)));
  }, []);
  useEffect(() => {
    if (cart) {
      setGames(cart.games);
    }
  }, [cart]);

  return (
    <div className={classes.table}>
      <DataGrid
        checkboxSelection
        rows={games}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(selectionModel) => {
          setSelectedGame(selectionModel);
        }}
      />
      <div />
      <p>Total price:{totalPrice}$</p>
      <Button type="submit" onClick={onDeleteSelectedGame}>
        Delete
      </Button>
      <Button type="submit" onClick={OnBuy}>
        Buy
      </Button>
    </div>
  );
};
export default Cart;
