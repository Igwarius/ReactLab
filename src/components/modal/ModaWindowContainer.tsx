import React from "react";
import { StatusCodes } from "http-status-codes";
import { useDispatch, useSelector } from "react-redux";
import { IFormInput, IModalProps } from "@/types";
import { InputName, InputType, InputPlaceholder, ModalType, IS_AUTHORIZED_KEY } from "@/constants/globalConstants";
import ModalWindow, { IForm, IModalWindow } from "./ModalWindow";
import { getStatusSelector, getUserNameSelector } from "@/redux/selectors/authSelectors";
import { signIn, signOut } from "@/redux/actions/authActions";
import { changePassword, registrationOrLogin } from "@/redux/thunks/authThunks";

const ModalWindowContainer = ({ typeModal, handleClose, open }: IModalProps) => {
  const dispatch = useDispatch();
  const statusRed = useSelector(getStatusSelector);
  const userName = useSelector(getUserNameSelector);
  const onSubmit = (values: IForm) => {
    if (typeModal !== ModalType.passwordChange) {
      dispatch(registrationOrLogin({ typeModal, values }));
      if (statusRed === StatusCodes.OK) {
        handleClose();
        dispatch(signIn());
      }
    } else {
      dispatch(changePassword({ password: values.password, login: userName }));
      localStorage.removeItem(IS_AUTHORIZED_KEY);
      dispatch(signOut());
      handleClose();
    }
  };

  const validation = (values: IForm) => {
    const errors: IForm = { login: undefined, password: undefined, passwordCheck: undefined };
    const minPasswordLength = 8;
    if (!values.login && typeModal !== ModalType.passwordChange) {
      errors.login = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (values.password && values.password.length < minPasswordLength) {
      errors.password = `${minPasswordLength} or more characters`;
    }
    if (
      (typeModal === ModalType.registration || typeModal === ModalType.passwordChange) &&
      values.password !== values.passwordCheck
    ) {
      errors.passwordCheck = "Not same";
    }

    return errors;
  };

  const logIn: IFormInput = {
    name: InputName.logIn,
    placeholder: InputPlaceholder.logIn,
    type: InputType.text,
  };
  const password: IFormInput = {
    name: InputName.password,
    placeholder: InputPlaceholder.password,
    type: InputType.password,
  };
  const passwordCheck: IFormInput = {
    name: InputName.passwordCheck,
    placeholder: InputPlaceholder.passwordCheck,
    type: InputType.password,
  };
  const props: IModalWindow = {
    typeModal,
    handleClose,
    open,
    onSubmit,
    validation,
    logIn,
    password,
    passwordCheck,
  };

  return <ModalWindow {...props} />;
};
export default ModalWindowContainer;
