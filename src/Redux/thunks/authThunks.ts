/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ModalType } from "@/constants/globalConstants";
import urls from "@/constants/urls";
import { IForm } from "@/components/modal/ModalWindow";

export const AuthThunks = {
  REGISTRARION_OR_SIGNIN: "user/registrationOrLogin",
};
interface IRegistrationParametrs {
  values: IForm;
  typeModal: ModalType | null;
}

export const registrationOrLogin = createAsyncThunk(
  AuthThunks.REGISTRARION_OR_SIGNIN,
  async ({ typeModal, values }: IRegistrationParametrs) => {
    const response = await axios.post(typeModal !== ModalType.registration ? urls.LOG_IN : urls.REGISTRATION, values);

    return response.status;
  }
);
