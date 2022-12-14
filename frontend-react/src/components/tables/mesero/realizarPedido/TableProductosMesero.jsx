import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination
} from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import RowProductosMesero from '@/components/meseros/RowProductosMesero';
import { labelDisplayedRows, labelRowsPerPage } from '@/i18n';
import { useEffect } from 'react';
import { useOrden } from '@/context/OrdenContext';

const columnas = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'tamaño', label: 'Tamaño' },
  { id: 'acciones', label: 'Acciones' }
];

const TableProductosMesero = () => {
  const { productos } = useOrden();

  const [pageProducts, setPageProducts] = useState(0);
  const [rowsProducts, setRowsProducts] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState(productos);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const array = productos.filter(
      (val) =>
        search === '' || val.nombre.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(array);
  }, [search, productos]);

  // Paginacion tabla productos
  const handleChangePageProducts = (event, newPage) => {
    setPageProducts(newPage);
  };

  const handleChangeRowsPerPageProducts = (event) => {
    setRowsProducts(Number(event.target.value));
    setPageProducts(0);
  };

  return (
    <>
      <div className="mb-3">
        <h1 className="font-bold text-base">Productos</h1>
      </div>
      <form className="mb-3">
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
            <button className="bg-azul-marino text-white border-2 border-azul-marino transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white  hover:text-azul-marino">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </form>
      {productos.length === 0 ? (
        <p className="text-center">No hay productos</p>
      ) : (
        <Paper sx={{ mb: 3 }}>
          {filteredProducts.length === 0 ? (
            <p className="text-center">Este producto no se ha agregado</p>
          ) : (
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
                  {filteredProducts.map((product) => (
                    <RowProductosMesero product={product} key={product.id} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
            style={{ width: '100%' }}
            rowsPerPageOptions={[10, 50, 100, 200]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsProducts}
            page={pageProducts}
            onPageChange={handleChangePageProducts}
            onRowsPerPageChange={handleChangeRowsPerPageProducts}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={labelDisplayedRows}
          />
        </Paper>
      )}
    </>
  );
};

export default TableProductosMesero;
