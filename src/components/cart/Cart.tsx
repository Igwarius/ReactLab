import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    height: "400px",
    width: "100%",
  },
});
export interface ICart {
  games: unknown[];
  columns: {
    field: string;
    headerName: string;
  }[];
  setSelectedGame: React.Dispatch<React.SetStateAction<unknown[]>>;
  totalPrice: number;
  onDeleteSelectedGame: () => void;
  OnBuy: () => void;
}

const Cart = ({ games, columns, setSelectedGame, totalPrice, onDeleteSelectedGame, OnBuy }: ICart) => {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      {games ? (
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
      ) : (
        <div />
      )}

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
