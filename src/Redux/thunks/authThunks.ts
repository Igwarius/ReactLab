/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IS_AUTHORIZED_KEY, ModalType } from "@/constants/globalConstants";
import urls from "@/constants/urls";
import { IForm } from "@/components/modal/ModalWindow";

export const AuthThunks = {
  REGISTRATION_OR_SIGNIN: "user/registrationOrLogin",
  GET_PROFILE: "user/profile",
  CHANGE_PASSWORD: "user/changePassword",
};
interface IRegistrationParametrs {
  values: IForm;
  typeModal: ModalType | null;
}

export const registrationOrLogin = createAsyncThunk(
  AuthThunks.REGISTRATION_OR_SIGNIN,
  async ({ typeModal, values }: IRegistrationParametrs) => {
    const response = await axios.post(typeModal !== ModalType.Registration ? urls.LOG_IN : urls.REGISTRATION, values);
    if (values.login) {
      localStorage.setItem(IS_AUTHORIZED_KEY, values.login);
    }

    return response.status;
  }
);
export const getProfile = createAsyncThunk(AuthThunks.GET_PROFILE, async (userName: string) => {
  const response = await axios.get(`${urls.GET_PROFILE}?name=${userName}`);

  return response.data;
});
export const changePassword = createAsyncThunk(AuthThunks.CHANGE_PASSWORD, async (values: IForm) => {
  const response = await axios.post(urls.CHANGE_PASSWORD, values);
  localStorage.clear();

  return response.status;
});
export const saveProfile = createAsyncThunk(AuthThunks.CHANGE_PASSWORD, async (values: IForm) => {
  const response = await axios.post(urls.SAVE_PROFILE, values);

  return response.status;
});
