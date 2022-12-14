import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper
} from '@mui/material';
import RowCarritoProductos from '@/components/meseros/RowCarritoProductos';

const columnas = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'acciones', label: 'Acciones' }
];

const TableCarritoProductos = ({ carrito, setCarrito }) => {
  const [observacion, setObservacion] = useState('');

  const handleChangeCantidad = (id, cantidad) => {
    setCarrito((current) =>
      current.map((item) => {
        if (item.id === id) {
          return { ...item, cantidad };
        }

        return item;
      })
    );
  };

  const handleDeleteProduct = (id) => {
    const confirm = window.confirm('¿Está seguro de eliminar el producto?');

    if (confirm) {
      setCarrito((current) => current.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center gap-10 mb-3 overflow-x-auto">
        <h1 className="font-bold text-base">Carrito de productos</h1>
        <div className="flex gap-5">
          <Link
            to={'/mesero/realizar-pedido'}
            className="rounded-md py-2 px-8 text-xs bg-[#008000]/20 text-[#008000] font-bold transition duration-300 ease-in-out hover:bg-[#008000] hover:text-white cursor-pointer"
          >
            Terminar pedido
          </Link>
          <Link
            to={'/mesero/realizar-pedido'}
            className="rounded-md py-2 px-8 text-xs bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white"
          >
            Volver
          </Link>
        </div>
      </div>
      <Paper sx={{ mb: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow style={{ background: '#D00000' }}>
                {columnas.map((columna) => (
                  <TableCell
                    key={columna.id}
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat'
                    }}
                    align="center"
                  >
                    {columna.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {carrito.map((product) => (
                <RowCarritoProductos
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                  onChange={handleChangeCantidad}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <h1 className="font-bold text-base">Observaciones del pedido</h1>
        <div>
          <textarea
            className="w-full text-black rounded-lg border-2 border-azul-marino/20 focus-within:border-azul-marino focus:outline-none"
            name=""
            id=""
            cols="20"
            rows="5"
            onChange={(e) => setObservacion(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default TableCarritoProductos;
