export const IS_AUTHORIZED_KEY = "isAutorised";
export const REQUIRED_ERROR_MESSAGE = "Required";
export enum ModalType {
  Registration = "Registration",
  LogIn = "Log in",
  PasswordChange = "Password Change",
}

export enum InputName {
  LogIn = "login",
  Password = "password",
  PasswordCheck = "passwordCheck",
  description = "description",
}

export enum InputPlaceholder {
  LogIn = "Login",
  Password = "Password",
  PasswordCheck = "Password Check",
  description = "Description",
}

export enum InputType {
  Text = "text",
  Password = "password",
}

export const GameGener = [
  { value: "All", lable: "All" },
  { value: "rpg", lable: "RPG" },
  { value: "shooter", lable: "Shooter" },
  { value: "action", lable: "Action" },
];
export const GameAge = ["All", "0", "6", "12", "18"];
export const GameSortType = ["Raiting", "Price"];
export const debounceDelay = 300;
