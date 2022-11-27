import React, { createContext, useContext, useState } from "react";
import { dataProductos} from "../data/datos";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(dataProductos);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleDeleteAccount = (id) => {
    setDataAccount(dataAccount.filter((item) => item.id !== id));
  }

  return (
    <StateContext.Provider
      value={{
        handleDelete,
        handleDeleteAccount,
        data,
        setData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
