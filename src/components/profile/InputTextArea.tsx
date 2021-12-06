import { makeStyles } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { InputName, InputPlaceholder } from "@/constants/globalConstants";

interface IFormInput {
  name: InputName;
  placeholder: InputPlaceholder;
}

const useStyles = makeStyles(() => ({
  errors: {
    color: "red",
  },
}));

const InputTextArea = ({ name, placeholder }: IFormInput) => {
  const classes = useStyles();

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div>
          <span>{placeholder}</span>
          <div>
            <textarea {...input} />
            {(meta.error || meta.submitError) && meta.touched && (
              <span className={classes.errors}>{meta.error || meta.submitError}</span>
            )}
          </div>
        </div>
      )}
    </Field>
  );
};
export default InputTextArea;
