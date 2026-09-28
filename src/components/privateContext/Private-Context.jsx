import { createContext, useState } from "react";

export const Context = createContext();

export function PrivateContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));
  return (
    <Context.Provider value={{ token, setToken, name, setName }}>
      {children}
    </Context.Provider>
  );
}
