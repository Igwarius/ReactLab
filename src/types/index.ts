import { InputName, InputPlaceholder, ModalType } from "@/constants/globalConstants";

export interface IGame {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  date: Date;
}

export interface IModalProps {
  type: ModalType;
  changeIsLogged: () => void;
  handleCloseReg: () => void;
}

export interface IFormInput {
  name: InputName;
  placeholder: InputPlaceholder;
}
