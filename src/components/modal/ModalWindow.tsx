import { Button, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { Form } from "react-final-form";
import { IFormInput } from "@/types";
import { ModalType } from "@/constants/globalConstants";
import FormInput from "./FormInput";

export interface IModalWindow {
  typeModal: ModalType | null;
  handleClose: () => void;
  open: boolean;
  onSubmit: (values: IForm) => Promise<void>;
  validation: (values: IForm) => IForm;
  logIn: IFormInput;
  password: IFormInput;
  passwordCheck: IFormInput;
}

export interface IForm {
  login?: string;
  password?: string;
  passwordCheck?: string;
}

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "white",
    color: "black",
    textDecoration: "none",
    height: "25%",
    margin: "0",
    width: "30%",
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
}));

const ModalWindow = (props: IModalWindow) => {
  const classes = useStyles();
  const { typeModal, handleClose, open, onSubmit, validation, logIn, password, passwordCheck } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.menuPaper}>
        <Form
          onSubmit={onSubmit}
          validate={validation}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.content}>
                <p className={classes.header}>{typeModal}</p>
                <div>
                  <FormInput {...logIn} />
                </div>

                <div>
                  <FormInput {...password} />
                </div>

                {typeModal === ModalType.registration ? (
                  <div>
                    <FormInput {...passwordCheck} />
                  </div>
                ) : (
                  <div />
                )}

                <Button type="submit">{typeModal}</Button>
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  );
};
export default ModalWindow;
