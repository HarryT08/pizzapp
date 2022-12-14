import { useState, useEffect, createContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { instance } from '@/api/api';
import { ModalProducto, TableProductos } from '@/components';

const initialProduct = {
  nombre: '',
  precio: 0,
  preparaciones: [],
  selectedSizes: []
};

export const SelectedProductContext = createContext({
  selectedProduct: initialProduct,
  setSelectedProduct: () => {},
  ingredientes: []
});

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const [ingredientes, setIngredientes] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        <button className="btn" onClick={handleOpenModal}>
          Agregar producto
        </button>
      </div>

      {/* DataTable Productos */}
      <div className="mt-3">
        <TableProductos
          search={search}
          products={products}
          getProductos={getProductos}
          setShowModal={setShowModal}
          onChangeSelectedProduct={setSelectedProduct}
        />
      </div>
      <SelectedProductContext.Provider
        value={{ selectedProduct, setSelectedProduct, ingredientes }}
      >
        <ModalProducto
          handleCloseModal={handleCloseModal}
          modalOpen={showModal}
          setModalOpen={setShowModal}
          getProductos={getProductos}
        />
      </SelectedProductContext.Provider>
    </div>
  );
};

export default Productos;
