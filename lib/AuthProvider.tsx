import { createContext, useState } from "react";

export const AuthContext = createContext<any>({});
const Provider = AuthContext.Provider;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const isAuthenticated = () => token !== null;
  return (
    <Provider value={{ token, isAuthenticated, setToken }}>{children}</Provider>
  );
}
