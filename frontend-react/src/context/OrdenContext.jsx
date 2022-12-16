import { getProductosAndPreparaciones } from '@/services/productos';
import { calcularDisponiblesRestantes } from '@/utils/productos';
import { useCallback } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const OrdenContext = createContext({
  ingredientes: {},
  productos: [],
  carrito: [],
  disponibles: {},
  onChangeCantidad: (id, cantidad) => {},
  onDeleteProducto: (id, tamanio) => {},
  onAddProducto: (producto, tamanio) => true
});

export function useOrden() {
  return useContext(OrdenContext);
}

export function OrdenProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [ingredientes, setIngredientes] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [disponibles, setDisponibles] = useState({});

  const getProductsOrder = async () => {
    try {
      const data = await getProductosAndPreparaciones();
      setProductos(data.productos);
      setIngredientes(data.ingredientes);
      setDisponibles(data.disponible);
    } catch (err) {
      toast.error('No se pudo obtener los productos');
      console.error(err);
    }
  };

  useEffect(() => {
    getProductsOrder();
  }, []);

  const onChangeCantidad = useCallback(({ producto, tamanio, cantidad }) => {
    const disponible = calcularDisponiblesRestantes({
      producto,
      tamanio,
      cantidad
    });

    setDisponibles((current) => ({ ...current, [producto.id]: disponible }));

    setCarrito((current) =>
      current.map((item) => {
        if (item.id === producto.id && item.tamanio === tamanio) {
          return { ...item, cantidad };
        }

        return item;
      })
    );
  }, []);

  const onDeleteProducto = (id, tamanio) => {
    setCarrito((current) =>
      current.filter((item) => {
        return item.id !== id || item.tamanio !== tamanio;
      })
    );
  };

  const onAddProducto = (producto, tamanio) => {
    if (
      carrito.some(
        (item) => item.id === producto.id && item.tamanio === tamanio
      )
    ) {
      return false;
    }

    const disponible = calcularDisponiblesRestantes({
      producto,
      tamanio,
      cantidad: 1
    });

    setDisponibles((current) => ({ ...current, [producto.id]: disponible }));

    setCarrito((current) =>
      current.concat({ ...producto, cantidad: 1, tamanio })
    );

    return true;
  };

  return (
    <OrdenContext.Provider
      value={{
        ingredientes,
        productos,
        carrito,
        disponibles,
        onChangeCantidad,
        onDeleteProducto,
        onAddProducto
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
}
