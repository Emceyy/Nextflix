"use client";

import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Context.Provider value={{ toggle, mode }}>
      <div className={`${mode}`}>{children}</div>
    </Context.Provider>
  );
};