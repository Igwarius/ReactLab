import React from "react";
import { useDispatch } from "react-redux";
import { IFormInput, IGame } from "@/types";
import { InputName, InputType, InputPlaceholder, REQUIRED_ERROR_MESSAGE, ModalType } from "@/constants/globalConstants";
import GameModal, { IGameModalWindow } from "./GameModal";
import { addGame, deleteGame, putGame } from "@/redux/thunks/gameThunks";

export interface IGameModalProps {
  typeModal?: ModalType;
  open: boolean;
  handleModal: () => void;
  game: IGame;
}
const GameModalContainer = ({ typeModal, handleModal: handleClose, open, game }: IGameModalProps) => {
  const dispatch = useDispatch();

  const onSubmit = (values: IGame) => {
    if (typeModal === ModalType.AddGame) {
      dispatch(addGame(values));
    } else {
      dispatch(putGame(values));
    }
    handleClose();
  };
  const onDelete = () => {
    dispatch(deleteGame(game));
    handleClose();
  };

  const validation = (values: IGame) => {
    const errors: IGame = {
      id: undefined,
      name: undefined,
      price: undefined,
      img: undefined,
      rating: undefined,
      date: undefined,
      age: undefined,
      genre: undefined,
      platform: undefined,
    };

    const nameIsEmpty = !values.name;
    const platfoemIsEmpty = !values.platform;
    if (nameIsEmpty) {
      errors.name = REQUIRED_ERROR_MESSAGE;
    }
    if (platfoemIsEmpty) {
      errors.platform = REQUIRED_ERROR_MESSAGE;
    }

    return errors;
  };

  const name: IFormInput = {
    name: InputName.Name,
    placeholder: InputPlaceholder.Name,
    type: InputType.Text,
  };
  const category: IFormInput = {
    name: InputName.Category,
    placeholder: InputPlaceholder.Category,
    type: InputType.Text,
  };
  const price: IFormInput = {
    name: InputName.Price,
    placeholder: InputPlaceholder.Price,
    type: InputType.Text,
  };
  const image: IFormInput = {
    name: InputName.Image,
    placeholder: InputPlaceholder.Image,
    type: InputType.Text,
  };
  const age: IFormInput = {
    name: InputName.Age,
    placeholder: InputPlaceholder.Age,
    type: InputType.Text,
  };
  const platform: IFormInput = {
    name: InputName.Platform,
    placeholder: InputPlaceholder.Platform,
    type: InputType.Text,
  };
  const props: IGameModalWindow = {
    typeModal,
    handleClose,
    open,
    onSubmit,
    validation,
    name,
    category,
    price,
    image,
    age,
    platform,
    game,
    onDelete,
  };

  return <GameModal {...props} />;
};
export default GameModalContainer;
