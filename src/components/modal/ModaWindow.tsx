import { Button, makeStyles } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import React from "react";
import { Form } from "react-final-form";
import { StatusCodes } from "http-status-codes";
import urls from "@/constants/urls";
import { IFormInput, IModalProps } from "@/types";
import IS_AUTORISED_KEY from "@/constants/globalConstants";
import FormInput from "./FormInput";

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

const ModalWindow = ({ type, changeIsLogged, handleCloseReg }: IModalProps) => {
  const classes = useStyles();
  const onSubmit = async (values: IForm) => {
    const response: AxiosResponse<IAuthStatus> = await axios.post(
      type !== "Registration" ? urls.LOG_IN : urls.REGISTRATION,
      values
    );
    if (response.status === StatusCodes.OK) {
      localStorage.setItem(IS_AUTORISED_KEY, "true");
      changeIsLogged();
      handleCloseReg();
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
      errors.password = "8 or more characters";
    }
    if (type === "Registration" && values.password !== values.passwordCheck) {
      errors.passwordCheck = "Not same";
    }

    return errors;
  };

  const logIn: IFormInput = { name: "login", placeholder: "Login" };
  const password: IFormInput = { name: "password", placeholder: "Password" };
  const passwordCheck: IFormInput = { name: "passwordCheck", placeholder: "Password check" };

  return (
    <div className={classes.menuPaper}>
      <Form
        onSubmit={onSubmit}
        validate={validation}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.content}>
              <p className={classes.header}>{type}</p>
              <div>
                <FormInput {...logIn} />
              </div>

              <div>
                <FormInput {...password} />
              </div>

              {type === "Registration" ? (
                <div>
                  <FormInput {...passwordCheck} />
                </div>
              ) : (
                <div />
              )}

              <Button type="submit">{type}</Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
export default ModalWindow;
