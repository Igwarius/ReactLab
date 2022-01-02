import React from "react";
import { Field } from "react-final-form";
import { FormControlLabel, Radio, makeStyles, RadioGroup } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  globalInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  innerInputContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

export interface IRadioButtonsFormProps {
  name: string;
  array: string[];
}

const RadioButtonsForm = ({ name, array }: IRadioButtonsFormProps) => {
  const classes = useStyles();

  return (
    <Field name={name}>
      {({ input }) => (
        <div className={classes.globalInputContainer}>
          <div className={classes.innerInputContainer}>
            <RadioGroup {...input}>
              {array
                .filter((element) => element !== "All")
                .map((element) => (
                  <FormControlLabel value={element} control={<Radio />} label={element} />
                ))}
            </RadioGroup>
          </div>
        </div>
      )}
    </Field>
  );
};
export default RadioButtonsForm;
