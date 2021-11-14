import React from "react";
import { ILoginContext } from "@/types";

const LogInContext = React.createContext({
  signIn: undefined,
  signOut: undefined,
  isLogged: false,
} as ILoginContext);

export default LogInContext;
