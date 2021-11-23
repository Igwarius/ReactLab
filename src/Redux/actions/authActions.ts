import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ModalType } from "@/constants/globalConstants";
import urls from "@/constants/urls";
import { IForm } from "@/components/modal/ModalWindow";

interface IRegistrationParametrs {
  values: IForm;
  typeModal: ModalType | null;
}
export const AuthActions = {
  LOGOUT_USER: "user/logout",
  SIGNIN_USER: "user/signin",
  REGISTRARION_OR_SIGNIN: "user/registrationOrLogin",
};
export const signIn = createAction(AuthActions.SIGNIN_USER);
export const signOut = createAction(AuthActions.LOGOUT_USER);
export const registrationOrLogin = createAsyncThunk(
  AuthActions.REGISTRARION_OR_SIGNIN,
  async ({ typeModal, values }: IRegistrationParametrs) => {
    const response = await axios.post(typeModal !== ModalType.registration ? urls.LOG_IN : urls.REGISTRATION, values);

    return response.status;
  }
);
