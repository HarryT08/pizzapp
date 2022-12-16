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
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import { useOrden } from '@/context/OrdenContext';
import { createComanda } from '@/services/comanda';

const columnas = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'tamanio', label: 'Tamaño' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'acciones', label: 'Acciones' }
];

const TableCarritoProductos = () => {
  const [observacion, setObservacion] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { carrito, onDeleteProducto } = useOrden();

  const handleDeleteProduct = (id, tamanio) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `No podrás revertir esto!`,
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D00000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteProducto(id, tamanio);
        Swal.fire('Producto eliminado', '', 'success');
      }
    });
  };

  const sendComanda = async () => {
    if (carrito.length === 0) {
      Swal.fire('Error', 'No hay productos en el carrito', 'error');
      return;
    }

    setLoading(true);

    try {
      await createComanda({
        id_mesa: id,
        observacion: observacion,
        data: carrito
      });

      Swal.fire('Exito', 'Pedido realizado', 'success').then(() => {
        navigate('/mesero/realizar-pedido');
      });
    } catch (err) {
      toast.error('No se pudo realizar el pedido');

      if (err?.response?.status === 400) {
        err.response.data.errors.forEach((error) => {
          toast.error(
            `No se pudo agregar el producto ${error.nombre} en la presentación ${error.tamanio}`
          );
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-10 mb-3 overflow-x-auto">
        <h1 className="font-bold text-base">Carrito de productos</h1>
        <div className="flex gap-5">
          <button
            type="submit"
            onClick={sendComanda}
            className="rounded-md py-2 px-8 text-xs bg-[#008000]/20 text-[#008000] font-bold transition duration-300 ease-in-out hover:bg-[#008000] hover:text-white cursor-pointer"
          >
            {loading ? <Loader /> : 'Terminar pedido'}
          </button>
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
                  key={product.id + '-' + product.tamanio}
                  product={product}
                  onDelete={handleDeleteProduct}
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
