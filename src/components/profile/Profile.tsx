/* eslint-disable no-param-reassign */
import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import ReactFileReader from "react-file-reader";
import { InputName, InputPlaceholder, InputType } from "@/constants/globalConstants";

import ModalWindowContainer from "../modal/ModaWindowContainer";
import FormInput from "../modal/FormInput";

import { IModalProps } from "@/types";

export interface IProfileFormFields {
  login?: string;
  description?: string;
}

export interface IProfile {
  onSubmit: (values: IProfileFormFields) => void;
  validation: (values: IProfileFormFields) => IProfileFormFields;
  changePassword: IModalProps;
  file: string;
  handleFiles: (files: { base64: React.SetStateAction<string> }) => void;
  description: string;
  logIn: {
    name: InputName;
    placeholder: InputPlaceholder;
    type: InputType;
  };
  handleOpenModal: () => void;
  userName: string;
}

const useStyles = makeStyles(() => ({
  errors: {
    color: "red",
  },
  globalContainer: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
  },
  button: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Profile = ({
  onSubmit,
  validation,
  changePassword,
  file,
  handleFiles,
  logIn,
  handleOpenModal,
  description,
  userName,
}: IProfile) => {
  const classes = useStyles();

  return (
    <Form
      initialValues={{ [InputName.LogIn]: userName, [InputName.description]: description }}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      onSubmit={onSubmit}
      validate={validation}
      render={({ handleSubmit }) => (
        <>
          <ModalWindowContainer {...changePassword} />
          <form onSubmit={handleSubmit}>
            <div className={classes.globalContainer}>
              <div className={classes.container}>
                <img alt="img" src={file} height="400" width="400" />
                <ReactFileReader base64 handleFiles={handleFiles}>
                  <Button className={classes.button}>Upload</Button>
                </ReactFileReader>
              </div>
              <div className={classes.container}>
                <FormInput {...logIn} />
                <Field name={InputName.description}>
                  {({ input, meta }) => (
                    <div>
                      <span>{InputPlaceholder.Description}</span>
                      <div>
                        <textarea {...input} />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span className={classes.errors}>{meta.error || meta.submitError}</span>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
              <div className={classes.container}>
                <Button color="inherit" onClick={handleOpenModal}>
                  Change Password
                </Button>

                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </>
      )}
    />
  );
};

export default Profile;
