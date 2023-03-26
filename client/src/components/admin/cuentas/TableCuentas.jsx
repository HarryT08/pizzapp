import { useContext, useState, useEffect } from "react";
import { CuentaContext } from "@/context/cuentas/CuentasContext";
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
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const columns = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "cargo", label: "Cargo" },
  { id: "acciones", label: "Acciones" },
];

const TableCuentas = () => {
  const { cuentas, isLoading, deleteCuenta } = useContext(CuentaContext);
  const [pageCuentas, setPageCuentas] = useState(0);
  const [rowsCuentas, setRowsCuentas] = useState(5);

  // Paginacion tabla Ingredientes
  const handleChangePageCuentas = (event, newPage) => {
    setPageCuentas(newPage);
  };

  const handleChangeRowsPerPageCuentas = (event) => {
    setRowsCuentas(+event.target.value);
    setPageCuentas(0);
  };

  const handleDeleteCuenta = (id) => {
    if (cuentas.length === 1) {
      return toast.error("No puede eliminar la última cuenta");
    } else {
      Swal.fire({
        title: "¿Está seguro?",
        text: "No podrá recuperar esta cuenta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCuenta(id);
        }
      });
    }
  };

  if (isLoading) return <div className="loader"></div>;

  return (
    <Card sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: 800 }}>
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
            {cuentas.map((cuenta) => (
              <TableRow hover key={cuenta.cedula}>
                <TableCell align="center">{cuenta.cedula}</TableCell>
                <TableCell align="center">
                  {cuenta.persona.nombre} {cuenta.persona.apellido}
                </TableCell>
                <TableCell align="center">
                  <span className={`${cuenta.rol.nombre}`}>
                    {cuenta.rol.nombre}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Eliminar" arrow>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteCuenta(cuenta.cedula)}
                    >
                      <HiOutlineTrash />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar" arrow>
                    <IconButton color="primary" size="small">
                      <AiOutlineArrowRight />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={cuentas.length}
          page={pageCuentas}
          onPageChange={handleChangePageCuentas}
          rowsPerPage={rowsCuentas}
          onRowsPerPageChange={handleChangeRowsPerPageCuentas}
          labelRowsPerPage={labelRowsPerPage}
          labelDisplayedRows={labelDisplayedRows}
        />
      </Box>
    </Card>
  );
};

export default TableCuentas;
