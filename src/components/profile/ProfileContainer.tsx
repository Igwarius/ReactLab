import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InputName, ModalType, InputPlaceholder, InputType } from "@/constants/globalConstants";
import urls from "@/constants/urls";
import {
  isAutorisedSelector,
  getUserNameSelector,
  getDescriptionSelector,
  getImgSelector,
} from "@/redux/selectors/authSelectors";
import { getProfile, saveProfile } from "@/redux/thunks/authThunks";
import { IModalProps } from "@/types";
import Profile, { IForm, IProfile } from "./Profile";

const ProfileContainer = () => {
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
    typeModal: ModalType.PasswordChange,
    handleClose: handleCloseModal,
    open: openModal,
  };
  const onSubmit = (values: IForm) => {
    dispatch(saveProfile({ login: values.login, description: values.description, img: file }));
  };
  const logIn = { name: InputName.LogIn, placeholder: InputPlaceholder.LogIn, type: InputType.Text };
  const props: IProfile = {
    onSubmit,
    description,
    validation,
    userName,
    changePassword,
    file,
    handleFiles,
    logIn,
    handleOpenModal,
  };

  return <Profile {...props} />;
};
export default ProfileContainer;
