import { makeStyles } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { IFormInput } from "@/types";

const useStyles = makeStyles(() => ({
  errors: {
    color: "red",
  },
  global_input_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: "50%",
  },
  inner_input_container: {
    display: "flex",
    flexDirection: "column",
  },
}));

const FormInput = ({ name, placeholder }: IFormInput) => {
  const classes = useStyles();

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className={classes.global_input_container}>
          <span>Login</span>
          <div className={classes.inner_input_container}>
            <input className={classes.input} {...input} type="text" placeholder={placeholder} />

            {(meta.error || meta.submitError) && meta.touched && (
              <span className={classes.errors}>{meta.error || meta.submitError}</span>
            )}
          </div>
        </div>
      )}
    </Field>
  );
};
export default FormInput;
