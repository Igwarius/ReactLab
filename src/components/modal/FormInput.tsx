import { makeStyles } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { IFormInput } from "@/types";
import ErrorMessage from "../profile/ErrorMessage";

const useStyles = makeStyles(() => ({
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

const FormInput = ({ name, placeholder, type }: IFormInput) => {
  const classes = useStyles();

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className={classes.globalInputContainer}>
          <span>{placeholder}</span>
          <div className={classes.innerInputContainer}>
            <input className={classes.input} {...input} type={type} placeholder={placeholder} />

            <ErrorMessage meta={meta} />
          </div>
        </div>
      )}
    </Field>
  );
};
export default FormInput;
