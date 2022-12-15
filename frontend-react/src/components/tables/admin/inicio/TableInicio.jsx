import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { instance } from "../../../../api/api";

const columns = [
  { id: 1, label: "#Orden" },
  { id: 2, label: "Fecha" },
  { id: 3, label: "Total orden" },
  { id: 4, label: "Estado" },
];

const options = { style: 'currency', currency: 'COP', minimumFractionDigits: 0 };
const numberFormat = new Intl.NumberFormat('es-CO', options);
const fechaFormat = new Intl.DateTimeFormat('es-CO', {year: 'numeric', month: '2-digit', day: '2-digit' });

const TableInicio = () => {
  const [comandas, setComandas] = useState([]);

  const getLastComandas = async () => {
    try {
      const response = await instance.get("/comanda/getLastComandas");
      setComandas(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLastComandas();
  }, []);

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
            {comandas.map((comanda) => (
              <TableRow key={comanda.id}>
                <TableCell
                  style={{ fontFamily: "Montserrat" }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {comanda.id}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {fechaFormat.format(new Date(comanda.fecha))}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {numberFormat.format(comanda.total)}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {" "}
                  <p className={`${comanda.estado}`}>{comanda.estado}</p>{" "}
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
