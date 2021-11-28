import { createContext } from "react";

function noop() {}

export const AuthContext: React.Context<{
  token: string;
  logout: () => void;
  isAuthenticated?: boolean;
}> = createContext({
  token: "",
  logout: noop,
});
