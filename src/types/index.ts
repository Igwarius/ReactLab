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
  handleClose: () => void;
}

export interface IFormInput {
  name: InputName;
  placeholder: InputPlaceholder;
  type: InputType;
}

export interface ILoginContext {
  isLogged: boolean;
  signIn?: () => void;
  signOut?: () => void;
}

export interface IAuthState {
  isAutorised: boolean;
  status: number;
}

export interface IGameState {
  games: IGame[];
  searchGames: IGame[];
}
