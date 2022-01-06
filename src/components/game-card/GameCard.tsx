import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { IGame } from "@/types";
import { getRoleSelector, getUserNameSelector, isAutorisedSelector } from "@/redux/selectors/authSelectors";
import { addToCart } from "@/redux/thunks/gameThunks";
import { AdminRole, ModalType } from "@/constants/globalConstants";
import GameModalContainer, { IGameModalProps } from "./GameModalContainer";

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

const GameCard = ({ id, name, img, price, rating, date, age, genre, platform }: IGame) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const role = useSelector(getRoleSelector);
  const isLogged = useSelector(isAutorisedSelector);
  const userName = useSelector(getUserNameSelector);
  const [modelType, setModelType] = React.useState<ModalType | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleOpenAdd = () => {
    setOpenModal(true);
    setModelType(ModalType.AddGame);
  };

  const handleOpenEdit = () => {
    setOpenModal(true);
    setModelType(ModalType.EditGame);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const GameModalProps: IGameModalProps = {
    typeModal: modelType,
    handleModal: handleCloseModal,
    open: openModal,
    game: { id, name, img, price, rating, date, age, genre, platform },
  };
  const onClick = () => {
    if (isLogged) {
      dispatch(addToCart({ userName, gameName: name }));
    }
  };

  return (
    <div onClick={onClick} onKeyDown={onClick} className={classes.root}>
      <h3 className={classes.header}> {name}</h3>
      <img className={classes.img} src={img} alt="Poster" />
      <p>price: {price} $</p>
      <Rating name="read-only" value={rating} readOnly />
      {role === AdminRole && (
        <>
          <Button onClick={handleOpenAdd}>Add</Button>
          <Button onClick={handleOpenEdit}>Edit</Button>
        </>
      )}

      <GameModalContainer {...GameModalProps} />
    </div>
  );
};

export default React.memo(GameCard);
