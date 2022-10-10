import React, { createContext, useContext, useState } from "react";
import { dataProductos, dataIngredientes,dataCuentas} from "../data/datos";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [data, setData] = useState(dataProductos);
  const [dataProducts, setDataProducts] = useState(dataIngredientes);
  const [dataAccount, setDataAccount] = useState(dataCuentas);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleDeleteProduct = (id) => {
    setDataProducts(dataProducts.filter((item) => item.id !== id));
  }

  const handleDeleteAccount = (id) => {
    setDataAccount(dataAccount.filter((item) => item.id !== id));
  }

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        handleDelete,
        handleDeleteProduct,
        handleDeleteAccount,
        data,
        setData,
        dataProducts,
        setDataProducts,
        dataAccount,
        setDataAccount,
        search,
        setSearch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
