import { useState, useEffect, createContext } from 'react';
import { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { instance } from '@/api/api';
import { ModalProducto, TableProductos } from '@/components';
import * as productsServices from '@/services/productos';

const initialProduct = {
  id: '',
  nombre: '',
  costo: 0,
  selectedSizes: []
};

export const SelectedProductContext = createContext({
  producto: initialProduct,
  setProducto: () => {},
  ingredientes: [],
  preparaciones: [],
  setPreparaciones: () => {}
});

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('create');

  const [ingredientes, setIngredientes] = useState([]);
  const [producto, setProducto] = useState(initialProduct);
  const [preparaciones, setPreparaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setAction('create');
    setProducto(initialProduct);
    setPreparaciones([]);
    setShowModal(true);
  };

  const handleUpdate = (producto) => {
    setAction('update');
    handleChangeProducto(producto);
    setShowModal(true);
  };

  // show products
  const getProductos = async () => {
    try {
      const response = await instance.get('/productos');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getIngredientes = async () => {
    try {
      const response = await instance.get('/ingredientes');
      return setIngredientes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeProducto = useCallback((producto) => {
    const { preparaciones, ...rest } = producto;

    setProducto(rest);
    setPreparaciones(preparaciones);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (producto.nombre.trim() === '') {
      return toast.error('El nombre del producto es obligatorio.');
    }

    if (!producto.costo) {
      return toast.error('El precio del producto es obligatorio.');
    }

    if (isNaN(producto.costo)) {
      return toast.error('El precio del producto no es válido.');
    }

    if (preparaciones.length === 0) {
      return toast.error('No se ha seleccionado ningún ingrediente.');
    }

    setLoading(true);

    try {
      const data = {
        id: producto.id,
        nombre: producto.nombre,
        costo: producto.costo,
        preparaciones
      };

      if (action === 'create') {
        await productsServices.createProduct(data);
      } else if (action === 'update') {
        await productsServices.updateProduct(data);
      }

      toast.success('Producto agregado correctamente');
      setPreparaciones([]);
      setShowModal(false);
      getProductos();
    } catch (err) {
      toast.error('No se pudo guardar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
    getIngredientes();
  }, []);

  return (
    <div className="w-full">
      {/* Barra busqueda */}
      <ToastContainer />
      <div className="flex justify-between pb-3 border-b-2">
        <form>
          <div className="flex">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-2 movilM:px-2.5 py-1 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-azul-marino/20 focus-within:border-azul-marino focus:outline-none"
            />
            <div className="inline-flex">
              <button className="bg-azul-marino text-white border-2 border-azul-marino transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white hover:text-azul-marino">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-3">
        <button className="btn" onClick={handleCreate}>
          Agregar producto
        </button>
      </div>

      {/* DataTable Productos */}
      <div className="mt-3">
        <TableProductos
          search={search}
          products={products}
          getProductos={getProductos}
          onUpdate={handleUpdate}
        />
      </div>
      <SelectedProductContext.Provider
        value={{
          producto,
          setProducto,
          ingredientes,
          preparaciones,
          setPreparaciones,
          onUpdate: handleUpdate,
          onSubmit: handleSubmit,
          loading
        }}
      >
        <ModalProducto isOpen={showModal} onClose={() => setShowModal(false)} />
      </SelectedProductContext.Provider>
    </div>
  );
};

export default Productos;
