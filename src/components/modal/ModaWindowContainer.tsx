import axios, { AxiosResponse } from "axios";
import React from "react";
import { StatusCodes } from "http-status-codes";
import { useDispatch } from "react-redux";
import urls from "@/constants/urls";
import { IFormInput, IModalProps } from "@/types";
import { InputName, InputType, InputPlaceholder, ModalType } from "@/constants/globalConstants";
import ModalWindow, { IForm, IModalWindow } from "./ModalWindow";
import { signIn } from "@/Redux/reducer";

interface IAuthStatus {
  data: {
    success: boolean;
  };
}

const ModalWindowContainer = ({ typeModal, handleClose, open }: IModalProps) => {
  const dispatch = useDispatch();
  const onSubmit = async (values: IForm) => {
    const response: AxiosResponse<IAuthStatus> = await axios.post(
      typeModal !== ModalType.registration ? urls.LOG_IN : urls.REGISTRATION,
      values
    );
    if (response.status === StatusCodes.OK) {
      handleClose();
      dispatch(signIn());
    }
  };

  const validation = (values: IForm) => {
    const errors: IForm = { login: undefined, password: undefined, passwordCheck: undefined };
    const minPasswordLength = 8;
    if (!values.login) {
      errors.login = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (values.password && values.password.length < minPasswordLength) {
      errors.password = `${minPasswordLength} or more characters`;
    }
    if (typeModal === ModalType.registration && values.password !== values.passwordCheck) {
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
