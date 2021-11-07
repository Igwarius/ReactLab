export interface IGame {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  date: Date;
}
export interface IModalProps {
  type: string;
  changeIsLogged: () => void;
  handleCloseReg: () => void;
}
