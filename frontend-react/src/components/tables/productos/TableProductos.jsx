import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';
import { AiTwotoneDelete, AiFillEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';

import { instance } from '@/api/api';
import * as productosService from '@/services/productos';

// Columnas de los productos
const columnsProductos = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'precio', label: 'Precio' },
  { id: 'acciones', label: 'Acciones' }
];

const TableProductos = ({
  search,
  products,
  getProductos,
  onUpdate
}) => {
  const [pageProducts, setPageProducts] = useState(0);
  const [rowsProducts, setRowsProducts] = useState(10);

  // Paginacion tabla productos
  const handleChangePageProducts = (event, newPage) => {
    setPageProducts(newPage);
  };

  const handleChangeRowsPerPageProducts = (event) => {
    setRowsProducts(+event.target.value);
    setPageProducts(0);
  };

  // Funcion para eliminar productos
  const deleteProduct = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#D00000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
        instance
          .delete(`/productos/${id}`)
          .then((res) => {
            getProductos();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // Funcion para filtrar los productos
  const filterData = () => {
    return products.filter((product) => {
      return (
        search === '' ||
        product.nombre.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const handleEdit = async (producto) => {
    try {
      const object = await productosService.getProductoAndPreparaciones(
        producto.id
      );

      onUpdate(object);
    } catch (error) {
      toast.error('No se pudo obtener el producto');
      console.error(error);
    }
  };

  if (products.length === 0) {
    return <Alert severity="error"><strong>No hay productos.</strong></Alert>
  }

  return (
    <Paper>
      {filterData().length === 0 ? (
        <Alert severity="error"><strong>No hay productos.</strong></Alert>
      ) : (
        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
          <Table>
            <TableHead>
              <TableRow style={{ background: '#D00000' }}>
                {columnsProductos.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      color: '#fff',
                      fontWeight: 'bold'
                    }}
                    align="center"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData()
                .slice(
                  pageProducts * rowsProducts,
                  pageProducts * rowsProducts + rowsProducts
                )
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align="center">{product.nombre}</TableCell>
                    <TableCell align="center">{product.costo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-5 justify-center">
                        <button onClick={() => handleEdit(product)}>
                          <AiFillEdit
                            size={25}
                            className="bg-naranja-vivido rounded-full p-1 text-white cursor-pointer"
                          />
                        </button>
                        <AiTwotoneDelete
                          size={25}
                          className="bg-rojo-fuerte rounded-full p-1 text-white cursor-pointer"
                          onClick={() => deleteProduct(product.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        style={{ width: '100%' }}
        rowsPerPageOptions={[10, 50, 100, 200]}
        component="div"
        count={products.length}
        rowsPerPage={rowsProducts}
        page={pageProducts}
        onPageChange={handleChangePageProducts}
        onRowsPerPageChange={handleChangeRowsPerPageProducts}
      />
    </Paper>
  );
};

export default TableProductos;
