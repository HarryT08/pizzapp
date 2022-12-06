import { useState } from "react";
import { dataOrdenes } from "../../../data/datos";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";

const columns = [
  { id: "orden", label: "#Orden" },
  { id: "fecha", label: "Fecha" },
  { id: "totalOrden", label: "Total Orden" },
  { id: "estado", label: "Estado" },
  { id: "acciones", label: "Acciones" },
];

const TableOrdenes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataOrders, setDataOrders] = useState(dataOrdenes);


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

  const ordernarUltimos = () => {
    return dataOrders.sort((a,b) => {
      return b.id - a.id;
    })
  }

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
            value="terminado"
            control={<Radio />}
            label="Terminado"
            onClick={() => filterResults("Terminado")}
          />
          <FormControlLabel
            value="pendiente"
            control={<Radio />}
            label="Pendiente"
            onClick={() => filterResults("Pendiente")}
          />
          <FormControlLabel
            value="cancelado"
            control={<Radio />}
            label="Cancelado"
            onClick={() => filterResults("Cancelado")}
          />
        </RadioGroup>
      </FormControl>
      {/* Data table */}
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "#D00000" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                    }}
                    align="center"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ordernarUltimos()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      style={{ fontFamily: "Montserrat" }}
                      align="center"
                    >
                      {item.id}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: "Montserrat" }}
                      align="center"
                    >
                      {item.fecha}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: "Montserrat" }}
                      align="center"
                    >
                      {item.total}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: "Montserrat" }}
                      align="center"
                    >
                      {" "}
                      <p className={`${item.estado}`}>{item.estado}</p>{" "}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center gap-5 justify-center">
                        <AiFillEdit
                          size={25}
                          className="bg-naranja-vivido rounded-full p-1 text-white cursor-pointer"
                        />
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
        />
      </Paper>
    </>
  );
};

export default TableOrdenes;
