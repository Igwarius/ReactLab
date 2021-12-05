import React from "react";
import { StatusCodes } from "http-status-codes";
import { useDispatch, useSelector } from "react-redux";
import { IFormInput, IModalProps } from "@/types";
import { InputName, InputType, InputPlaceholder, ModalType, IS_AUTHORIZED_KEY } from "@/constants/globalConstants";
import ModalWindow, { IForm, IModalWindow } from "./ModalWindow";
import { getStatusSelector, getUserNameSelector } from "@/redux/selectors/authSelectors";
import { signOut } from "@/redux/actions/authActions";
import { changePassword, registrationOrLogin } from "@/redux/thunks/authThunks";

const ModalWindowContainer = ({ typeModal, handleClose, open }: IModalProps) => {
  const dispatch = useDispatch();
  const statusRed = useSelector(getStatusSelector);
  const userName = useSelector(getUserNameSelector);
  const onSubmitLogin = (values: IForm) => {
    dispatch(registrationOrLogin({ typeModal, values }));
    if (statusRed === StatusCodes.OK) {
      handleClose();
    }
  };
  const onSubmitPasswordChange = (values: IForm) => {
    dispatch(changePassword({ password: values.password, login: userName }));
    localStorage.removeItem(IS_AUTHORIZED_KEY);
    dispatch(signOut());
    handleClose();
  };
  const validation = (values: IForm) => {
    const errors: IForm = { login: undefined, password: undefined, passwordCheck: undefined };
    const minPasswordLength = 8;
    const loginIsEmpty = !values.login;
    const isNotPasswordChangeModal = typeModal !== ModalType.PasswordChange;
    const isNotPasswordSame = values.password !== values.passwordCheck;
    const isPasswordEmpty = !values.password;
    const isPasswordLengthNotCorrect = values.password.length < minPasswordLength;
    if (loginIsEmpty && isNotPasswordChangeModal) {
      errors.login = "Required";
    }
    if (isPasswordEmpty) {
      errors.password = "Required";
    }
    if (!isPasswordEmpty && isPasswordLengthNotCorrect) {
      errors.password = `${minPasswordLength} or more characters`;
    }
    if (!isNotPasswordChangeModal && isNotPasswordSame) {
      errors.passwordCheck = "Not same";
    }

    return errors;
  };

  const logIn: IFormInput = {
    name: InputName.LogIn,
    placeholder: InputPlaceholder.LogIn,
    type: InputType.Text,
  };
  const password: IFormInput = {
    name: InputName.Password,
    placeholder: InputPlaceholder.Password,
    type: InputType.Password,
  };
  const passwordCheck: IFormInput = {
    name: InputName.PasswordCheck,
    placeholder: InputPlaceholder.PasswordCheck,
    type: InputType.Password,
  };
  const props: IModalWindow = {
    typeModal,
    handleClose,
    open,
    onSubmitLogin,
    onSubmitPasswordChange,
    validation,
    logIn,
    password,
    passwordCheck,
  };

  return <ModalWindow {...props} />;
};
export default ModalWindowContainer;
