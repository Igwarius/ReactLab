import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  errors: {
    color: "red",
  },
}));

const ErrorMessage = ({ meta }) => {
  const classes = useStyles();

  return <span className={classes.errors}>{meta.error || meta.submitError}</span>;
};
export default ErrorMessage;
