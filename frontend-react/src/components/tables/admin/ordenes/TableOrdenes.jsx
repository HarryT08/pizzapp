import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
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
  Divider,
  TablePagination,
  IconButton,
  Tooltip
} from "@mui/material";
import {  AiOutlineArrowRight } from "react-icons/ai";
import {HiOutlineTrash} from 'react-icons/hi'
import { instance } from "@/api/api";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const columns = [
  { id: "orden", label: "#Orden" },
  { id: "fecha", label: "Fecha" },
  { id: "totalOrden", label: "Total Orden" },
  { id: "estado", label: "Estado" },
  { id: "acciones", label: "Acciones" },
];

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};
const numberFormat = new Intl.NumberFormat("es-CO", options);
const fechaFormat = new Intl.DateTimeFormat("es-CO", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const TableOrdenes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataOrdenes, setDataOrdenes] = useState([]);

  const navigate = useNavigate();

  const getComandas = async () => {
    try {
      const response = await instance.get("/comanda");
      setDataOrdenes(response.data);
      setDataOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getComandaById = async (id) => {
    try {
      const response = await instance.get(`/detallecomanda/${id}`);
      navigate(`/admin/ordenes/comanda/${id}`);
      console.log(response.data);
    } catch (err) {
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
    const results = dataOrdenes.filter((curElem) => {
      return curElem.estado === categoria;
    });
    setDataOrders(results);
  };

  const showAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTableOrder(id);
        Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
      }
    });
  };

  return (
    <>
      {/* Inputs filter */}
      <Box sx={{marginBottom: "10px"}}>
        <FormControl sx={{padding: "10px 20px 0 20px"}}>
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
              value="abierta"
              control={<Radio />}
              label="Abierta"
              onClick={() => filterResults("Abierta")}
            />
          </RadioGroup>
        </FormControl>
        <Divider sx={{
          "&.MuiDivider-root": {
            borderColor: "rgba(0, 0, 0, 0.05)",
          }
        }}/>
      </Box>
      {/* Data table */}
      <Box>
        <TableContainer
          sx={{
            "&.MuiTableContainer-root": {
              borderRadius: "0px",
              border: "none",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f8f9fa" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      color: "#000000",
                      fontWeight: "600",
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
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">
                      {fechaFormat.format(new Date(item.fecha))}
                    </TableCell>
                    <TableCell align="center">
                      {numberFormat.format(item.total)}
                    </TableCell>
                    <TableCell align="center">
                      <p className={`${item.estado}`}>{item.estado}</p>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center gap-3 justify-center">
                        <Tooltip title="Eliminar" arrow>
                          <IconButton onClick={() => showAlert(item.id)}>
                            <HiOutlineTrash />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Ver orden" arrow>
                          <IconButton onClick={() => getComandaById(item.id)}>
                            <AiOutlineArrowRight />
                          </IconButton>
                        </Tooltip>
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
      </Box>
    </>
  );
};

export default TableOrdenes;
