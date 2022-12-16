import { getComandaEnMesa } from '@/services/comanda';
import { getEstadoMesas } from '@/services/mesas';
import { getProductosAndPreparaciones } from '@/services/productos';
import {
  calcularDisponiblesRestantes,
  normalizeProductos
} from '@/utils/productos';
import { useCallback } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [estado, setEstado] = useState('Disponible');
  const { id } = useParams();

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

  const loadEstadoMesa = useCallback(async () => {
    const mesas = await getEstadoMesas('Ocupado');

    if (!mesas.some((mesa) => Number(mesa.id) === Number(id))) {
      setEstado('Disponible');
      return;
    }

    setEstado('Ocupado');

    const comanda = await getComandaEnMesa(id);
    const productosComanda = comanda.detalleComanda.map((item) => {
      const preparar = calcularDisponiblesRestantes(item);

      return {
        ...item.producto,
        cantidad: item.cantidad,
        tamanio: item.tamanio,
        preparar
      };
    });

    const { ingredientes, productos } = normalizeProductos(productosComanda);
    setIngredientes(ingredientes);
    setCarrito(productos);
  }, [id]);

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

  useEffect(() => {
    getProductsOrder();
    loadEstadoMesa();
  }, [loadEstadoMesa]);

  return (
    <OrdenContext.Provider
      value={{
        ingredientes,
        productos,
        carrito,
        disponibles,
        estado,
        onChangeCantidad,
        onDeleteProducto,
        onAddProducto
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
}
