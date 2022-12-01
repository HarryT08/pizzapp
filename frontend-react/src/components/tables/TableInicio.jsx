import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, fecha, totalOrden, estado) {
  return { id, fecha, totalOrden, estado };
}

const rows = [
  createData(1, "30-09-2022", "$150000", "Terminado"),
  createData(2, "20-09-2022", "$150000", "Pendiente"),
  createData(3, "10-09-2022", "$150000", "Cancelado"),
  createData(4, "30-08-2022", "$150000", "Terminado"),
  createData(5, "20-08-2022", "$150000", "Cancelado"),
];

const columns = [
  { id: 1, label: "#Orden" },
  { id: 2, label: "Fecha" },
  { id: 3, label: "Total orden" },
  { id: 4, label: "Estado" },
];

const TableInicio = () => {
  const [order, setOrder] = useState(rows);

  const ordernarUltimos = () => {
    return order.sort((a, b) => {
      return b.id - a.id;
    });
  };

  return (
    <>
      <h1 className="font-bold text-base pb-2">Ordenes del dia</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow style={{ background: "#D00000" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordernarUltimos().map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  style={{ fontFamily: "Montserrat" }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.id}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {row.fecha}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {row.totalOrden}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {" "}
                  <p className={`${row.estado}`}>{row.estado}</p>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableInicio;
