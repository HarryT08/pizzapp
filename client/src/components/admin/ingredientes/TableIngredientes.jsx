import { useContext, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Alerta, ModalIngrediente } from "@/components";
import { IngredienteContext } from "@/context/ingredientes/IngredientesContext";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import * as ingredientesServices from "@/services/ingredientes/ingredientes";
import { toast } from "react-toastify";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "existencia", label: "Existencia" },
  { id: "acciones", label: "Acciones" },
];

const TableIngredientes = ({ searchIngredients }) => {
  const [pageIngredientes, setPageIngredientes] = useState(0);
  const [rowsIngredientes, setRowsIngredientes] = useState(10);
  const { ingredientes, deleteIngrediente } = useContext(IngredienteContext);
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState(null);
  const [modalEditIngredienteOpen, setModalEditIngredienteOpen] =
    useState(false);
  const [ingredienteAnterior, setIngredienteAnterior] = useState({
    existencia: "",
    pesaje: "",
  });

  // Paginacion tabla Ingredientes
  const handleChangePageIngredientes = (event, newPage) => {
    setPageIngredientes(newPage);
  };

  const handleChangeRowsPerPageIngredientes = (event) => {
    setRowsIngredientes(+event.target.value);
    setPageIngredientes(0);
  };

  // ?* Funcion Delete
  const deleted = async (id) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `No podrás revertir esto!`,
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El ingrediente ha sido eliminado.", "success");
        ingredientesServices
          .deleteIngredient(id)
          .then((res) => {
            deleteIngrediente(id);
            toast.success("Ingrediente eliminado correctamente");
          })
          .catch((error) => {
            toast.error("Error al eliminar el ingrediente");
          });
      }
    });
  };

  const handleOpenModalIngrediente = (ingrediente) => {
    setIngredienteSeleccionado(ingrediente);
    setIngredienteAnterior({
      existencia: ingrediente.existencia,
      pesaje: ingrediente.pesaje,
    });
    setModalEditIngredienteOpen(true);
  };

  const handleCloseModalIngrediente = () => {
    setIngredienteSeleccionado(null);
    setModalEditIngredienteOpen(false);
  };

  return (
    <>
      {ingredientes.length === 0 ? (
        <Alerta descripcion="No hay ingredientes" alerta="info" />
      ) : (
        <Card sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 800 }}>
            {searchIngredients().length === 0 ? (
              <Alerta
                descripcion="No se ha podido encontrar el ingrediente."
                alerta="info"
              />
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} align="center">
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchIngredients()
                      .slice(
                        pageIngredientes * rowsIngredientes,
                        pageIngredientes * rowsIngredientes + rowsIngredientes
                      )
                      .map((ingrediente) => (
                        <TableRow hover key={ingrediente.id}>
                          <TableCell align="center">
                            {ingrediente.nombre}
                          </TableCell>
                          <TableCell align="center">
                            {ingrediente.existencia} g
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Eliminar" arrow>
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => deleted(ingrediente.id)}
                              >
                                <HiOutlineTrash />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" arrow>
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() =>
                                  handleOpenModalIngrediente(ingrediente)
                                }
                              >
                                <AiOutlineArrowRight />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={searchIngredients().length}
                  rowsPerPage={rowsIngredientes}
                  page={pageIngredientes}
                  onPageChange={handleChangePageIngredientes}
                  onRowsPerPageChange={handleChangeRowsPerPageIngredientes}
                  labelRowsPerPage={labelRowsPerPage}
                  labelDisplayedRows={labelDisplayedRows}
                />
              </>
            )}
          </Box>
        </Card>
      )}
      <ModalIngrediente
        ingredienteAnterior={ingredienteAnterior}
        openEdit={modalEditIngredienteOpen}
        onCloseEdit={handleCloseModalIngrediente}
        ingredienteSeleccionado={ingredienteSeleccionado}
      />
    </>
  );
};

export default TableIngredientes;
