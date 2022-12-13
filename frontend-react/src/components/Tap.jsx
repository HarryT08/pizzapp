import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import TableIngredientesTab from './tables/productos/tab/TableIngredientesTab';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { instance } from '../api/api';
import { Loader } from '../components';
import '../styles/aditional-styles/checkbox.css';

const sizes = [
  { key: 'small', value: 'Pequeña' },
  { key: 'medium', value: 'Mediana' },
  { key: 'large', value: 'Grande' },
  { key: 'unique', value: 'Única' }
];

const transformIngredientesStructure = (ingredientes = [], size = 'unique') => {
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
  const [loading, setLoading] = useState(false);
  const [ingredientes, setIngredientes] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [name, setName] = useState('');
  const [precio, setPrecio] = useState(0);
  const [value, setValue] = useState('1');
  const [filterSizes, setFilterSizes] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');

  // sendData
  const enviarDatos = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      return toast.error('El nombre del producto es obligatorio.');
    }

    if (!precio || precio === 0) {
      return toast.error('El precio del producto es obligatorio.');
    }

    if (isNaN(precio)) {
      return toast.error('El precio debe ser un número.');
    }

    if (carrito.length === 0) {
      return toast.error('No se ha seleccionado ningún ingrediente.');
    }

    let presentaciones = [];

    if (filterSizes.some((item) => item.key === 'unique')) {
      presentaciones = [
        {
          ingredientes: transformIngredientesStructure(carrito, 'unique'),
          tamaño: 'unico'
        }
      ];
    } else {
      presentaciones = [
        {
          ingredientes: transformIngredientesStructure(carrito, 'small'),
          tamaño: 'pequeña'
        },
        {
          ingredientes: transformIngredientesStructure(carrito, 'medium'),
          tamaño: 'mediana'
        },
        {
          ingredientes: transformIngredientesStructure(carrito, 'large'),
          tamaño: 'grande'
        }
      ];
    }

    setLoading(true);

    try {
      await instance.post('/productos', {
        nombre: name,
        precio: precio,
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
    setValue(newValue);
  };

  // Funcion para eliminar el producto agg al carrito
  const deleteProduct = (id) => {
    setCarrito((current) => current.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    document.getElementById('form').reset();
    handleCloseModal();
  };

  const handleChangeChecked = (e, item) => {
    if (!e.target.checked) {
      const nextSizes = filterSizes.filter((a) => a.key !== item.key);
      setSelectedTab(nextSizes.at(-1)?.key);
      setFilterSizes(nextSizes);
      return;
    }

    if (item.key === 'unique') {
      setSelectedTab('unique');
      setFilterSizes([item]);
      return;
    }

    setSelectedTab(item.key);
    setFilterSizes((current) => [...current, item]);
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
        <form id="form" onSubmit={enviarDatos}>
          <TabPanel value="1">
            <div className="flex flex-col">
              <label className="block text-base font-medium">Nombre</label>
              <input
                required
                name="nombre"
                type="text"
                placeholder="Nombre"
                className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="block text-base font-medium">Precio</label>
              <input
                required
                name="costo"
                type="number"
                placeholder="Precio"
                className="block p-3 w-full flex-1 rounded-md border-azul-marino/70 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                onChange={(e) => setPrecio(Number(e.target.value))}
                value={precio}
              />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <ul className="ks-cboxtags flex flex-wrap justify-center gap-1">
              {sizes.map((item) => {
                const isChecked = filterSizes.some(
                  (size) => size.key === item.key
                );
                const isUniqueChecked = filterSizes.some(
                  (size) => size.key === 'unique'
                );

                const { key, value } = item;

                return (
                  <li key={key}>
                    <input
                      type="checkbox"
                      id={key}
                      className="w-3 h-3"
                      value={key}
                      checked={isChecked}
                      disabled={isUniqueChecked && key !== 'unique'}
                      onChange={(e) => handleChangeChecked(e, item)}
                    />
                    <label htmlFor={key} className="text-xs movilL:text-base">
                      {value}
                    </label>
                  </li>
                );
              })}
            </ul>
            <TableIngredientesTab
              carrito={carrito}
              setCarrito={setCarrito}
              ingredientes={ingredientes}
              setIngredientes={setIngredientes}
              sizes={filterSizes}
            />
            <div className="mt-2">
              <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={(event, value) => setSelectedTab(value)}>
                    {filterSizes.map((item) => (
                      <Tab key={item.key} label={item.value} value={item.key} />
                    ))}
                  </TabList>
                </Box>

                {filterSizes.map((size) => (
                  <TabPanel value={size.key} key={size.key}>
                    {carrito.map((item) => (
                      <InputIngrediente
                        key={item.id}
                        item={item}
                        size={size}
                        setCarrito={setCarrito}
                        deleteProduct={deleteProduct}
                      />
                    ))}
                  </TabPanel>
                ))}
              </TabContext>
            </div>
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

function InputIngrediente({ item, size, setCarrito, deleteProduct }) {
  const [value, setValue] = useState(item[size.key]);

  const handleChange = (e) => {
    //Quitar las letras y los espacios
    let value = e.target.value;
    value = value.replace(/([a-zA-Z]|\s)+/, '');
    value = Number(value);

    setValue(value);

    setCarrito((current) => {
      return current.map((currentItem) => {
        if (currentItem.id !== item.id) return currentItem;
        return { ...currentItem, [size.key]: value };
      });
    });
  };

  const handleBlur = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      return toast.error('La cantidad no es un valor válido.');
    }
  };

  return (
    <div
      className="flex items-center mb-2.5 gap-5 overflow-x-auto"
      key={item.id}
    >
      <p>{item.nombre}</p>
      <input
        required
        onChange={handleChange}
        value={value}
        name="cantidad"
        type="number"
        className="w-32 border-2 rounded-lg border-azul-marino/60 fo-within:border-azul-marino  focus:outline-none"
        onBlur={handleBlur}
      />
      <div className="flex items-center">
        <AiFillCloseCircle
          onClick={() => deleteProduct(item.id)}
          className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Tap;
