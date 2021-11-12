import { InputType, InputName, InputPlaceholder, ModalType } from "@/constants/globalConstants";

export interface IGame {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  date: Date;
}

export interface IModalProps {
  typeModal: ModalType | null;
  open: boolean;
  changeIsLogged: () => void;
  handleClose: () => void;
}

export interface IFormInput {
  name: InputName;
  placeholder: InputPlaceholder;
  type: InputType;
}
