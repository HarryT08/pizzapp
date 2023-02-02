import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Alert,
} from "@mui/material";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import { dataDrinks } from "@/data/datos";
import { useState } from "react";
import { IoIosTrash, IoMdBuild } from "react-icons/io";
import { DeletedButton, UpdateButton } from "@/components/mui/Buttons";

const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "precio", label: "Precio" },
  { id: "acciones", label: "Acciones" },
];

const TableBebidas = ({ search }) => {
  const [pageIngredientes, setPageIngredientes] = useState(0);
  const [rowsIngredientes, setRowsIngredientes] = useState(10);

  // Paginacion tabla Ingredientes
  const handleChangePageIngredientes = (event, newPage) => {
    setPageIngredientes(newPage);
  };

  const handleChangeRowsPerPageIngredientes = (event) => {
    setRowsIngredientes(+event.target.value);
    setPageIngredientes(0);
  };

  const filterData = () => {
    return dataDrinks.filter((drink) => {
      return (
        search === "" ||
        drink.nombre.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <>
      {dataDrinks.length === 0 ? (
        <Alert severity="error">
          <strong>No hay ingredientes</strong>
        </Alert>
      ) : (
        <Box height="80vh">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#D00000" }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
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
                    pageIngredientes * rowsIngredientes,
                    pageIngredientes * rowsIngredientes + rowsIngredientes
                  )
                  .map((drink) => (
                    <TableRow key={drink.id}>
                      <TableCell align="center">{drink.nombre}</TableCell>
                      <TableCell>{drink.precio}</TableCell>
                      <TableCell align="center">
                        <>
                          <DeletedButton>
                            <IoIosTrash />
                          </DeletedButton>
                          <UpdateButton>
                            <IoMdBuild />
                          </UpdateButton>
                        </>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              backgroundColor: "#D00000",
              color: "#FFFFFF",
              width: "100%",
              "& .MuiSvgIcon-root": {
                color: "rgb(255, 255, 255)",
              }
            }}
            rowsPerPageOptions={[10, 50, 100, 200]}
            component="div"
            count={dataDrinks.length}
            rowsPerPage={rowsIngredientes}
            page={pageIngredientes}
            onPageChange={handleChangePageIngredientes}
            onRowsPerPageChange={handleChangeRowsPerPageIngredientes}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={labelDisplayedRows}
          />
        </Box>
      )}
    </>
  );
};

export default TableBebidas;
