import { InputType, InputName, InputPlaceholder, ModalType } from "@/constants/globalConstants";

export interface IGame {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  date: Date;
  age: number;
  genre: string;
  platform: string;
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
  role: string;
}
interface ICart {
  games: IGame[];
}
export interface IGameState {
  items: IGame[];
  searchGames: IGame[];
  cart: ICart;
}
