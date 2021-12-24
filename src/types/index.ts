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
  handleModal: () => void;
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
  userName: string;
  description: string;
  img: string;
}
interface ICart {
  order: {
    games: IGame[];
    userName: string;
  };
}
export interface IGameState {
  items: IGame[];
  searchGames: IGame[];
  cart: ICart;
}
