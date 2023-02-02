import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import { Alerta } from "@/components";
import { useContext, useState } from "react";
import { AddedButton } from "@/components/mui/Buttons";
import { SelectedDrinkContext } from "@/pages/admin/bebidas/AgregarBebidas";
import { toast } from "react-toastify";

const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "acciones", label: "Acciones" },
];

const TableIngredientesBebidas = ({ selectedPreparations = [] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const { bebida, ingredientes, presentaciones, setPresentaciones } =
    useContext(SelectedDrinkContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Agregamos un producto al carrito
  const addIngrediente = (id) => {
    if (selectedPreparations.length === 0) {
      return toast.error("No se ha seleccionado ningún tamaño.");
    }

    if (presentaciones.some((item) => item.id_materia === id)) {
      return toast.error("El producto ya ha sido agregado.");
    }

    const ingrediente = ingredientes.find(
      (ingrediente) => ingrediente.id === id
    );

    const newPreparaciones = selectedPreparations.map((tamanio) => ({
      id_materia: id,
      id_producto: bebida.id,
      tamanio: tamanio.key,
      cantidad: 1,
      materiaPrima: ingrediente,
    }));

    setPresentaciones((current) => current.concat(newPreparaciones));
  };
  return (
    <div className="overflow-x-auto my-2">
      {ingredientes.length === 0 ? (
        <Alerta alerta="info" descripcion="No existen ingredientes aun"/>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ minWidth: 300 }}>
            <Table>
              <TableHead style={{ background: "#D00000" }}>
                <TableRow>
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
                {ingredientes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        style={{ fontFamily: "Montserrat" }}
                        align="center"
                      >
                        {item.nombre}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Montserrat" }}
                        align="center"
                      >
                        <div className="flex justify-center">
                          <AddedButton
                            type="button"
                            onClick={() => addIngrediente(item.id)}
                          >
                            Agregar
                          </AddedButton>
                        </div>
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
              },
            }}
            rowsPerPageOptions={[3, 9, 30, 100]}
            component="div"
            count={ingredientes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={labelDisplayedRows}
          />
        </>
      )}
    </div>
  );
};

export default TableIngredientesBebidas;
