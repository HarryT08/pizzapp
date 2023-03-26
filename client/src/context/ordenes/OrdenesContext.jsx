import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ordenesServices from "@/services/ordenes/ordenes";

export const OrdenesContext = createContext();

export const OrdenesProvider = ({ children }) => {
  const [comandas, setComandas] = useState([]);
  const [orderById, setOrderById] = useState({});
  const [numOrden, setNumOrden] = useState(0);
  const [open, setOpen] = useState(false);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["comandas"],
    queryFn: ordenesServices.getComandas,
    onSuccess: (data) => {
      setComandas(data);
    },
  });

  const getComandaById = async (id) => {
    try {
      const comanda = await ordenesServices.comandaById(id);
      setOrderById(comanda.data);
      setNumOrden(id);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    isLoading,
    comandas,
    isError,
    error,
    orderById,
    open,
    setOpen,
    getComandaById,
    numOrden
  };

  return (
    <OrdenesContext.Provider value={value}>{children}</OrdenesContext.Provider>
  );
};
