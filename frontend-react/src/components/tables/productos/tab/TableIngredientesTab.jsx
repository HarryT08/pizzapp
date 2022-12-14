import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { SelectedProductContext } from '@/pages/admin/Productos';

const columns = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'acciones', label: 'Acciones' }
];

const TableIngredientesTab = ({ carrito, setCarrito, selectedSizes = [] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const { ingredientes } = useContext(SelectedProductContext);

  // Paginacion de la tabla del modal
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Agregamos un producto al carrito
  const findProduct = (id) => {
    if (selectedSizes.length === 0) {
      return toast.error('No se ha seleccionado ningún tamaño.');
    }

    if (carrito.some((item) => item.id === id)) {
      return toast.error('El producto ya ha sido agregado.');
    }

    const data = ingredientes.find((ingrediente) => ingrediente.id === id);

    setCarrito([
      ...carrito,
      { ...data, small: 0, medium: 0, large: 0, unique: 0 }
    ]);
  };

  return (
    <div className="overflow-x-auto my-2">
      <TableContainer component={Paper} sx={{ minWidth: 300 }}>
        <Table>
          <TableHead style={{ background: '#D00000' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat'
                  }}
                  align="center"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    style={{ fontFamily: 'Montserrat' }}
                    align="center"
                  >
                    {item.nombre}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: 'Montserrat' }}
                    align="center"
                  >
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="w-max px-3 py-1 cursor-pointer rounded-full bg-azul-marino/20 font-medium text-azul-marino"
                        onClick={() => findProduct(item.id)}
                      >
                        Agregar
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ width: '100%' }}
        rowsPerPageOptions={[3, 9, 30, 100]}
        component="div"
        count={ingredientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'Filas por página'}
      />
    </div>
  );
};

export default TableIngredientesTab;
