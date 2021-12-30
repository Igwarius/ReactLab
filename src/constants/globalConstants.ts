export const IS_AUTHORIZED_KEY = "isAutorised";
export const REQUIRED_ERROR_MESSAGE = "Required";
export enum ModalType {
  Registration = "Registration",
  LogIn = "Log in",
  PasswordChange = "Password Change",
  AddGame = "Add Game",
  EditGame = "Edit Game",
}

export enum InputName {
  LogIn = "login",
  Password = "password",
  PasswordCheck = "passwordCheck",
  Description = "description",
  Name = "name",
  Category = "category",
  Price = "price",
  Image = "img",
  Age = "age",
  Platform = "platform",
  Date = "date",
  Genre = "genre",
}

export enum InputPlaceholder {
  LogIn = "Login",
  Password = "Password",
  PasswordCheck = "Password Check",
  Description = "Description",
  Name = "Name",
  Category = "Category",
  Price = "Price",
  Image = "Img",
  Age = "Age",
  Platform = "Platform",
}

export enum InputType {
  Text = "text",
  Password = "password",
}

export const GameGenres = [
  { value: "All", lable: "All" },
  { value: "rpg", lable: "RPG" },
  { value: "shooter", lable: "Shooter" },
  { value: "action", lable: "Action" },
];
export const GameAge = ["All", "0", "6", "12", "18"];
export const Platform = ["All", "pc", "xbox", "ps"];
export const GameSortType = ["Rating", "Price"];
export const debounceDelay = 300;
