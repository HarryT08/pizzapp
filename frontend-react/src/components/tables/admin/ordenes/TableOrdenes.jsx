import { useState, useEffect } from 'react';
import { dataOrdenes } from '../../../../data/datos';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination
} from '@mui/material';
import { AiTwotoneDelete, AiFillEdit } from 'react-icons/ai';
import { instance } from "../../../../api/api";
import Swal from 'sweetalert2';
import { labelDisplayedRows, labelRowsPerPage } from '@/i18n';

const columns = [
  { id: 'orden', label: '#Orden' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'totalOrden', label: 'Total Orden' },
  { id: 'estado', label: 'Estado' },
  { id: 'acciones', label: 'Acciones' }
];

const options = { style: 'currency', currency: 'COP', minimumFractionDigits: 0 };
const numberFormat = new Intl.NumberFormat('es-CO', options);
const fechaFormat = new Intl.DateTimeFormat('es-CO', {year: 'numeric', month: '2-digit', day: '2-digit' });

const TableOrdenes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataOrdenes, setDataOrdenes] = useState([]);

  const getComandas = async() => {
    try{
      const response = await instance.get('/comanda');
      setDataOrdenes(response.data);
      setDataOrders(response.data);
      console.log(response.data);
    }catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComandas();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteTableOrder = (id) => {
    setDataOrders(dataOrders.filter((item) => item.id !== id));
  };

  const filterResults = (categoria) => {
    const results = dataOrders.filter((curElem) => {
      return curElem.estado === categoria;
    });
    setDataOrders(results);
  };

  const showAlert = (id) => {
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
        handleDeleteTableOrder(id);
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
      }
    });
  };

  return (
    <>
      {/* Inputs filter */}
      <FormControl>
        <RadioGroup row defaultValue="todos" name="row-radio-buttons-group">
          <FormControlLabel
            value="todos"
            control={<Radio />}
            label="Todos"
            onClick={() => setDataOrders(dataOrdenes)}
          />
          <FormControlLabel
            value="facturado"
            control={<Radio />}
            label="Facturado"
            onClick={() => filterResults("Facturado")}
          />
          <FormControlLabel
            value="abierto"
            control={<Radio />}
            label="Abierto"
            onClick={() => filterResults("Abierto")}
          />
        </RadioGroup>
      </FormControl>
      {/* Data table */}
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: '#D00000' }}>
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
              {dataOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      style={{ fontFamily: 'Montserrat' }}
                      align="center"
                    >
                      {item.id}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: 'Montserrat' }}
                      align="center"
                    >
                      {fechaFormat.format(new Date(item.fecha))}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: 'Montserrat' }}
                      align="center"
                    >
                      {numberFormat.format(item.total)}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: 'Montserrat' }}
                      align="center"
                    >
                      {' '}
                      <p className={`${item.estado}`}>{item.estado}</p>
                      {' '}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center gap-5 justify-center">
                        <AiTwotoneDelete
                          size={25}
                          className="bg-rojo-fuerte rounded-full p-1 text-white cursor-pointer"
                          onClick={() => showAlert(item.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={labelRowsPerPage}
          labelDisplayedRows={labelDisplayedRows}
        />
      </Paper>
    </>
  );
};

export default TableOrdenes;
