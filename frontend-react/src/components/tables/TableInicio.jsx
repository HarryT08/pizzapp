import {useState} from 'react';
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

const TableInicio = () => {

  const [order, setOrder] = useState(rows);

  const ordernarUltimos = () => {
    return order.sort((a,b) => {
      return b.id - a.id;
    })
  }

  return (
    <>
      <h1 className="font-bold text-base pb-2">Ordenes del dia</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow style={{background: '#D00000'}}>
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                }}
                align="center"
              >
                #Orden
              </TableCell>
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                }}
                align="center"
              >
                Fecha
              </TableCell>
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                }}
                align="center"
              >
                Total orden
              </TableCell>
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                }}
                align="center"
              >
                Estado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordernarUltimos().map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell style={{fontFamily: "Montserrat"}} align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell style={{fontFamily: "Montserrat"}} align="center">{row.fecha}</TableCell>
                <TableCell style={{fontFamily: "Montserrat"}} align="center">{row.totalOrden}</TableCell>
                <TableCell style={{fontFamily: "Montserrat"}} align="center"> <p className={`${row.estado}`}>{row.estado}</p> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableInicio;