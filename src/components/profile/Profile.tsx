/* eslint-disable no-param-reassign */
import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Form } from "react-final-form";
import ReactFileReader from "react-file-reader";
import { InputName, InputPlaceholder, InputType } from "@/constants/globalConstants";

import ModalWindowContainer from "../modal/ModaWindowContainer";
import FormInput from "../modal/FormInput";

import { IModalProps } from "@/types";
import InputTextArea from "./InputTextArea";

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

  description,
  userName,
}: IProfile) => {
  const classes = useStyles();
  const profileImgSize = "400";
  const inputTextArea = { name: InputName.description, placeholder: InputPlaceholder.Description };

  return (
    <Form
      initialValues={{ [InputName.LogIn]: userName, [InputName.description]: description }}
      onSubmit={onSubmit}
      validate={validation}
      render={({ handleSubmit }) => (
        <>
          <ModalWindowContainer {...changePassword} />
          <form onSubmit={handleSubmit}>
            <div className={classes.globalContainer}>
              <div className={classes.container}>
                <img alt="User Avatar" src={file} height={profileImgSize} width={profileImgSize} />
                <ReactFileReader base64 handleFiles={handleFiles}>
                  <Button className={classes.button}>Upload</Button>
                </ReactFileReader>
              </div>
              <div className={classes.container}>
                <FormInput {...logIn} />
                <InputTextArea {...inputTextArea} />
              </div>
              <div className={classes.container}>
                <Button color="inherit" onClick={changePassword.handleModal}>
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
