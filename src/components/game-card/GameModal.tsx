import { Button, FormControlLabel, makeStyles, Modal, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import { Field, Form } from "react-final-form";
import { IFormInput, IGame } from "@/types";
import { GameAge, GameGenres, InputName, ModalType, Platform } from "@/constants/globalConstants";
import FormInput from "../modal/FormInput";
import ErrorMessage from "../profile/ErrorMessage";

export interface IGameModalWindow {
  typeModal: ModalType | null;
  handleClose: () => void;
  open: boolean;
  onDelete: () => void;
  onSubmit: (values: IGame) => void;
  validation: (values: IGame) => IGame;

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
              : []
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

                <Field name={age.name}>
                  {({ input }) => (
                    <div className={classes.globalInputContainer}>
                      <div className={classes.innerInputContainer}>
                        <RadioGroup {...input} aria-label="age">
                          {GameAge.filter((element) => element !== "All").map((element) => (
                            <FormControlLabel value={element} control={<Radio />} label={element} />
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}
                </Field>
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
                <Field name={InputName.Genre}>
                  {({ input }) => (
                    <div className={classes.globalInputContainer}>
                      <div className={classes.innerInputContainer}>
                        <RadioGroup {...input} aria-label="genre">
                          {GameGenres.filter((element) => element.lable !== "All").map((element) => (
                            <FormControlLabel value={element.value} control={<Radio />} label={element.lable} />
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}
                </Field>
                <Field name={InputName.Platform}>
                  {({ input }) => (
                    <div className={classes.globalInputContainer}>
                      <div className={classes.innerInputContainer}>
                        <RadioGroup {...input} aria-label="platform">
                          {Platform.filter((element) => element !== "All").map((element) => (
                            <FormControlLabel value={element} control={<Radio />} label={element} />
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}
                </Field>
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
