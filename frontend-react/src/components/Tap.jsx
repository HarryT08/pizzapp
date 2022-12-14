import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { instance } from '@/api/api';
import { Loader } from '@/components';
import '@/styles/aditional-styles/checkbox.css';
import { SelectedProductContext } from '@/pages/admin/Productos';
import TabProducto from './productos/TabProducto';
import TabPreparaciones from './productos/TabPreparaciones';

const transformIngredientesStructure = (ingredientes = [], size = 'unico') => {
  return ingredientes
    .filter((item) => item[size] > 0)
    .map((item) => ({
      id: item.id,
      nombre: item.nombre,
      existencia: item.existencia,
      cantidad: item[size]
    }));
};

const Tap = ({ handleCloseModal, getProductos }) => {
  const { selectedProduct } = useContext(SelectedProductContext);

  const [loading, setLoading] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [value, setValue] = useState('1');
  const [filterSizes, setFilterSizes] = useState([]);
  const formRef = useRef(null);

  // sendData
  const enviarDatos = async (e) => {
    e.preventDefault();

    if (selectedProduct.nombre.trim() === '') {
      return toast.error('El nombre del producto es obligatorio.');
    }

    if (!selectedProduct.precio || selectedProduct.precio === 0) {
      return toast.error('El precio del producto es obligatorio.');
    }

    if (isNaN(selectedProduct.precio)) {
      return toast.error('El precio debe ser un número.');
    }

    if (carrito.length === 0) {
      return toast.error('No se ha seleccionado ningún ingrediente.');
    }

    let presentaciones = [];

    if (filterSizes.some((item) => item.key === 'unique')) {
      presentaciones = [
        {
          ingredientes: transformIngredientesStructure(carrito, 'unico'),
          tamaño: 'unico'
        }
      ];
    } else {
      presentaciones = [
        {
          ingredientes: transformIngredientesStructure(carrito, 'pequeña'),
          tamaño: 'pequeña'
        },
        {
          ingredientes: transformIngredientesStructure(carrito, 'mediana'),
          tamaño: 'mediana'
        },
        {
          ingredientes: transformIngredientesStructure(carrito, 'grande'),
          tamaño: 'grande'
        }
      ];
    }

    setLoading(true);

    try {
      await instance.post('/productos', {
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        presentaciones: presentaciones
      });

      toast.success('Producto agregado correctamente');
      setCarrito([]);

      handleCloseModal();
      getProductos();
    } catch (err) {
      toast.error('No se pudo agregar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue || '');
  };

  const handleReset = () => {
    formRef.current.reset();
    handleCloseModal();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Producto" value="1" />
            <Tab label="Preparacion" value="2" />
          </TabList>
        </Box>
        <form id="form" onSubmit={enviarDatos} ref={formRef}>
          <TabPanel value="1">
            <TabProducto />
          </TabPanel>
          <TabPanel value="2">
            <TabPreparaciones />
          </TabPanel>
          <div className="flex gap-3 justify-center mt-4">
            <button type="submit" className="btn">
              {loading ? <Loader /> : 'Agregar'}
            </button>
            <span className="btnCancel cursor-pointer" onClick={handleReset}>
              Cancelar
            </span>
          </div>
        </form>
      </TabContext>
    </Box>
  );
};

export default Tap;
