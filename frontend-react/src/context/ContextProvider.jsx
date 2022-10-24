import React, { createContext, useContext, useState } from "react";
import { dataProductos, dataIngredientes} from "../data/datos";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [data, setData] = useState(dataProductos);
  const [dataProducts, setDataProducts] = useState(dataIngredientes);
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
        search,
        setSearch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
