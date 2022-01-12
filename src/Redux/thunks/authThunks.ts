/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IS_AUTHORIZED_KEY, ModalType } from "../../constants/globalConstants";
import apiUrls from "../../constants/apiUrls";
import { IForm } from "@/components/modal/ModalWindow";

export const AuthThunks = {
  REGISTRATION_OR_SIGNIN: "user/registrationOrLogin",
  GET_PROFILE: "user/profile",
  CHANGE_PASSWORD: "user/changePassword",
};
interface IRegistrationParameters {
  values: IForm;
  typeModal?: ModalType;
}

export const registrationOrLogin = createAsyncThunk(
  AuthThunks.REGISTRATION_OR_SIGNIN,
  async ({ typeModal, values }: IRegistrationParameters) => {
    const response = await axios.post(
      typeModal !== ModalType.Registration ? apiUrls.LOG_IN : apiUrls.REGISTRATION,
      values
    );
    if (values.login) {
      localStorage.setItem(IS_AUTHORIZED_KEY, values.login);
    }

    return response;
  }
);
export const getProfile = createAsyncThunk(AuthThunks.GET_PROFILE, async (userName: string) => {
  const response = await axios.get(`${apiUrls.GET_PROFILE}?name=${userName}`);

  return response.data;
});
export const changePassword = createAsyncThunk(AuthThunks.CHANGE_PASSWORD, async (values: IForm) => {
  const response = await axios.post(apiUrls.CHANGE_PASSWORD, values);
  localStorage.clear();

  return response.status;
});
export const saveProfile = createAsyncThunk(AuthThunks.CHANGE_PASSWORD, async (values: IForm) => {
  const response = await axios.post(apiUrls.SAVE_PROFILE, values);

  return response.status;
});
