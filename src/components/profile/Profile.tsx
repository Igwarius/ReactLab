import React, { useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import ReactFileReader from "react-file-reader";
import { useHistory } from "react-router";
import { InputName, InputPlaceholder, InputType, ModalType } from "@/constants/globalConstants";
import { getProfile, saveProfile } from "@/redux/thunks/authThunks";
import {
  getDescriptionSelector,
  getImgSelector,
  getUserNameSelector,
  isAutorisedSelector,
} from "@/redux/selectors/authSelectors";
import { IModalProps } from "@/types";
import ModalWindowContainer from "../modal/ModaWindowContainer";
import urls from "@/constants/urls";

export interface IForm {
  login?: string;
  description?: string;
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

const Profile = () => {
  const classes = useStyles();
  const handleFiles = (files: { base64: React.SetStateAction<string> }) => {
    console.log(files);
    setFile(files.base64);
  };
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<string>("");
  const dispatch = useDispatch();
  const isAutorised = useSelector(isAutorisedSelector);
  const userName = useSelector(getUserNameSelector);
  const description = useSelector(getDescriptionSelector);
  const img = useSelector(getImgSelector);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    if (!isAutorised) {
      history.push(urls.MAIN);
    }
  }, [isAutorised]);

  useEffect(() => {
    dispatch(getProfile(userName));
    setFormValue(InputName.logIn, userName);
    setFormValue(InputName.description, description);
    setFile(img);
  }, [userName, description]);

  const validation = (values: IForm) => {
    const errors: IForm = { login: undefined, description: undefined };

    if (!values.login) {
      errors.login = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }

    return errors;
  };

  const changePassword: IModalProps = {
    typeModal: ModalType.passwordChange,
    handleClose: handleCloseModal,
    open: openModal,
  };
  const onSubmit = (values: IForm) => {
    dispatch(saveProfile({ login: values.login, description: values.description, img: file }));
  };
  let setFormValue: { (arg0: InputName, arg1: string): void; (...args: unknown[]): unknown };

  return (
    <Form
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      onSubmit={onSubmit}
      validate={validation}
      render={({ handleSubmit, form }) => {
        setFormValue = form.mutators.setValue;

        return (
          <>
            <form onSubmit={handleSubmit}>
              <div className={classes.globalContainer}>
                <div className={classes.container}>
                  <img alt="img" src={file} height="400" width="400" />
                  <ReactFileReader base64 handleFiles={handleFiles}>
                    <Button className={classes.button}>Upload</Button>
                  </ReactFileReader>
                </div>
                <div className={classes.container}>
                  <Field name={InputName.logIn}>
                    {({ input, meta }) => (
                      <div>
                        <span>{InputPlaceholder.logIn}</span>
                        <div>
                          <input {...input} type={InputType.text} placeholder={InputPlaceholder.logIn} />

                          {(meta.error || meta.submitError) && meta.touched && (
                            <span className={classes.errors}>{meta.error || meta.submitError}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field name={InputName.description}>
                    {({ input, meta }) => (
                      <div>
                        <span>{InputPlaceholder.description}</span>
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
            <ModalWindowContainer {...changePassword} />
          </>
        );
      }}
    />
  );
};

export default Profile;
