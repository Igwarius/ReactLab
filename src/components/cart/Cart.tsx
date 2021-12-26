import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, makeStyles } from "@material-ui/core";
import { IGame } from "@/types";

const useStyles = makeStyles({
  table: {
    height: "400px",
    width: "100%",
  },
});
export interface ICart {
  games: IGame[];
  columns: {
    field: string;
    headerName: string;
  }[];
  setSelectedGame: React.Dispatch<React.SetStateAction<unknown[]>>;
  totalPrice: number;
  onDeleteSelectedGame: () => void;
  onBuy: () => void;
}

const Cart = ({ games, columns, setSelectedGame, totalPrice, onDeleteSelectedGame, onBuy }: ICart) => {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      {games && games.length && (
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
      )}
      <p>Total price:{totalPrice}$</p>
      <Button type="submit" onClick={onDeleteSelectedGame}>
        Delete
      </Button>
      <Button type="submit" onClick={onBuy}>
        Buy
      </Button>
    </div>
  );
};
export default Cart;
