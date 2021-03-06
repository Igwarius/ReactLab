import { Button, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { Field, Form } from "react-final-form";
import { IFormInput, IGame } from "@/types";
import { GameAge, GameGenres, InputName, ModalType, Platform } from "@/constants/globalConstants";
import FormInput from "../modal/FormInput";
import ErrorMessage from "../profile/ErrorMessage";

const RadioButtonsForm = React.lazy(() => import("./radioButtonsForm"));
export interface IGameModalWindow {
  typeModal?: ModalType;
  handleClose: () => void;
  open: boolean;
  onDelete: () => void;
  onSubmit: (values: IGame) => void;
  validation: (values: IGame) => Partial<IGame>;
  name: IFormInput;
  category: IFormInput;
  price: IFormInput;
  image: IFormInput;
  age: IFormInput;
  platform: IFormInput;
  game: IGame;
}

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "white",
    color: "black",
    textDecoration: "none",
    height: "70%",
    margin: "0",
    width: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errors: {
    color: "red",
  },
  globalInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: "50%",
  },
  innerInputContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

const GameModal = ({
  typeModal,
  handleClose,
  open,
  onSubmit,
  validation,
  name,
  game,
  price,
  image,
  age,
  onDelete,
}: IGameModalWindow) => {
  const classes = useStyles();
  const gameGenresValues = GameGenres.map((genre) => genre.value);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.menuPaper}>
        <Form
          initialValues={
            typeModal === ModalType.EditGame
              ? {
                  id: game.id,
                  [InputName.Name]: game.name,
                  [InputName.Price]: game.price,
                  [InputName.Image]: game.img,
                  [InputName.Age]: game.age,
                  [InputName.Date]: game.date,
                  [InputName.Genre]: game.genre.toString().toLowerCase(),
                  [InputName.Platform]: game.platform,
                }
              : {
                  id: 0,
                  [InputName.Name]: "",
                  [InputName.Price]: 0,
                  [InputName.Image]: "",
                  [InputName.Age]: 0,
                  [InputName.Date]: new Date(),
                  [InputName.Genre]: "",
                  [InputName.Platform]: "",
                }
          }
          onSubmit={onSubmit}
          validate={validation}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.content}>
                <p className={classes.header}>{typeModal}</p>
                <FormInput {...name} />

                <FormInput {...price} />
                <FormInput {...image} />

                <RadioButtonsForm name={age.name} values={GameAge} />
                <Field name="date">
                  {({ input, meta }) => (
                    <div className={classes.globalInputContainer}>
                      <div className={classes.innerInputContainer}>
                        <input {...input} type="date" />

                        <ErrorMessage meta={meta} />
                      </div>
                    </div>
                  )}
                </Field>
                <RadioButtonsForm name={InputName.Genre} values={gameGenresValues} />
                <RadioButtonsForm name={InputName.Platform} values={Platform} />

                <Button type="submit">{typeModal}</Button>
                <Button onClick={onDelete}>Delete</Button>
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  );
};
export default GameModal;
