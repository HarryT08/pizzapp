import { createContext, useState } from "react";

export const TomarOrdenContext = createContext();

export const TomarOrdenProvider = ({ children }) => {
  const [tamaniosSeleccionados, setTamaniosSeleccionados] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [subTotal, setSubtotal] = useState(0);

  const value = {
    tamaniosSeleccionados,
    setTamaniosSeleccionados,
    carrito,
    setCarrito,
    subTotal,
    setSubtotal,
  };

  return (
    <TomarOrdenContext.Provider value={value}>
      {children}
    </TomarOrdenContext.Provider>
  );
};
