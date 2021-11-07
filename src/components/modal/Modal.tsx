import { Button, makeStyles } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import React from "react";
import { Form, Field } from "react-final-form";
import urls from "@/constants/urls";
import globalConstants from "@/constants/globalConstants";
import { IModalProps } from "@/types";

interface IForm {
  login: string | undefined;
  password: string | undefined;
  passwordCheck: string | undefined;
}

interface IStatus {
  data: { success: boolean };
}

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "#3f51b5",
    color: "white",
    textDecoration: "none",
    height: "300px",
    margin: "0",
    width: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  content: { display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" },
  errors: { color: "red" },
}));
const MyForm = ({ type, changeIsLogged, handleCloseReg }: IModalProps) => {
  const classes = useStyles();
  const onSubmit = async (values: IForm) => {
    console.log(JSON.stringify(values));
    if (type !== "Registration") {
      const response: AxiosResponse<IStatus> = await axios.post(urls.LOG_IN, values);
      if (response.status === 200) {
        localStorage.setItem(globalConstants.IS_AUTORISED_KEY, "true");
        changeIsLogged();
        handleCloseReg();
      }
    } else {
      const response: AxiosResponse<IStatus> = await axios.post(urls.REGISTRATION, values);
      if (response.status === 200) {
        localStorage.setItem(globalConstants.IS_AUTORISED_KEY, "true");
        changeIsLogged();
        handleCloseReg();
      }
    }
  };

  return (
    <div className={classes.menuPaper}>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: IForm = { login: undefined, password: undefined, passwordCheck: undefined };
          if (!values.login) {
            errors.login = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (values.password && values.password.length < 8) {
            errors.password = "Must contain at least 8 or more characters";
          }
          if (type === "Registration" && values.password !== values.passwordCheck) {
            errors.passwordCheck = "Not same";
          }

          return errors;
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.content}>
              <div>{type}</div>
              <div>
                <Field name="login">
                  {({ input, meta }) => (
                    <div>
                      <label>Login</label>
                      <input {...input} type="text" placeholder="Login" />
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span className={classes.errors}>{meta.error || meta.submitError}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label>Password</label>
                      <input type="text" {...input} placeholder="Password" />
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span className={classes.errors}>{meta.error || meta.submitError}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              {type === "Registration" ? (
                <div>
                  <Field name="passwordCheck">
                    {({ input, meta }) => (
                      <div>
                        <label>Password check</label>
                        <input {...input} type="text" placeholder="Password check" />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span className={classes.errors}>{meta.error || meta.submitError}</span>
                        )}
                      </div>
                    )}
                  </Field>
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
export default MyForm;
