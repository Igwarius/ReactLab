import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IS_AUTHORIZED_KEY } from "@/constants/globalConstants";
import urls from "@/constants/urls";
import { getCartSelector } from "@/redux/selectors/gameSelectors";
import { deleteCart, getCart } from "@/redux/thunks/gameThunks";
import Cart, { ICart } from "./Cart";
import { IGame } from "@/types";

const CartContainer = () => {
  const [selectedGame, setSelectedGame] = useState<number[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const history = useHistory();

  const onDeleteSelectedGame = () => {
    const filteredFileList = games.filter((item) => !selectedGame.includes(item.id));
    setGames(filteredFileList);
  };
  const onBuy = () => {
    dispatch(deleteCart(localStorage.getItem(IS_AUTHORIZED_KEY)));
  };
  const columns = [
    { field: "name", headerName: "Game" },
    { field: "price", headerName: "Price" },
    { field: "genre", headerName: "Genre" },
    { field: "platform", headerName: "Platform" },
  ];

  useEffect(() => {
    dispatch(getCart(localStorage.getItem(IS_AUTHORIZED_KEY)));
  }, []);
  useEffect(() => {
    if (cart) {
      setGames(cart.games);
    }
  }, [cart]);
  useEffect(() => {
    let price = 0;
    if (games) {
      games.forEach((game) => {
        price += game.price;
      });
    }
    setTotalPrice(price);
  }, [games]);
  useEffect(() => {
    if (!localStorage.getItem(IS_AUTHORIZED_KEY)) {
      history.push(urls.MAIN);
    }
  }, [localStorage.getItem(IS_AUTHORIZED_KEY)]);

  const props: ICart = {
    games,
    columns,
    setSelectedGame,
    totalPrice,
    onDeleteSelectedGame,
    onBuy,
  };

  return <Cart {...props} />;
};
export default CartContainer;
