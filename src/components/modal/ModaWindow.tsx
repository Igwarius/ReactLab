import { Button, makeStyles, Modal } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { StatusCodes } from "http-status-codes";
import urls from "@/constants/urls";
import { IFormInput, IModalProps } from "@/types";
import { InputName, InputType, InputPlaceholder, ModalType } from "@/constants/globalConstants";
import FormInput from "./FormInput";
import LogInContext from "../loginContext";

interface IForm {
  login?: string;
  password?: string;
  passwordCheck?: string;
}

interface IAuthStatus {
  data: {
    success: boolean;
  };
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

const ModalWindow = ({ typeModal, handleClose: handleCloseReg, open }: IModalProps) => {
  const things = useContext(LogInContext);
  const classes = useStyles();
  const onSubmit = async (values: IForm) => {
    const response: AxiosResponse<IAuthStatus> = await axios.post(
      typeModal !== ModalType.registration ? urls.LOG_IN : urls.REGISTRATION,
      values
    );
    if (response.status === StatusCodes.OK) {
      handleCloseReg();
      things.signIn && things.signIn();
    }
  };

  const validation = (values: IForm) => {
    const errors: IForm = { login: undefined, password: undefined, passwordCheck: undefined };
    const minPasswordLength = 8;
    if (!values.login) {
      errors.login = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (values.password && values.password.length < minPasswordLength) {
      errors.password = `${minPasswordLength} or more characters`;
    }
    if (typeModal === ModalType.registration && values.password !== values.passwordCheck) {
      errors.passwordCheck = "Not same";
    }

    return errors;
  };

  const logIn: IFormInput = { name: InputName.logIn, placeholder: InputPlaceholder.logIn, type: InputType.text };
  const password: IFormInput = {
    name: InputName.password,
    placeholder: InputPlaceholder.password,
    type: InputType.password,
  };
  const passwordCheck: IFormInput = {
    name: InputName.passwordCheck,
    placeholder: InputPlaceholder.passwordCheck,
    type: InputType.password,
  };

  return (
    <Modal open={open} onClose={handleCloseReg}>
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
