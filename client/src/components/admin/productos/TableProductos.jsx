import { useState, useContext } from "react";
import { SelectedProductContext } from "@/context/productos/ProductContext";
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
import { Alerta } from "@/components";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import * as productosServices from "@/services/productos/productos";
import { toast } from "react-toastify";

// Columnas de los productos
const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "precio", label: "Precio" },
  { id: "acciones", label: "Acciones" },
];

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};
const numberFormat = new Intl.NumberFormat("es-CO", options);

const TableProductos = ({ searchProductos }) => {
  const [pageProductos, setPageProductos] = useState(0);
  const [rowsProductos, setRowsProductos] = useState(10);
  const { getProductos, onUpdate, products } = useContext(
    SelectedProductContext
  );

  // Paginacion tabla Ingredientes
  const handleChangePageProductos = (event, newPage) => {
    setPageProductos(newPage);
  };

  const handleChangeRowsPerPageProductos = (event) => {
    setRowsProductos(+event.target.value);
    setPageProductos(0);
  };

  const deleteProducto = (id) => {
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
        productosServices
          .deleteProduct(id)
          .then((res) => {
            getProductos();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const handleEdit = async (producto) => {
    try {
      const object = await productosServices.getProductoAndPreparaciones(
        producto.id
      );
      console.log("Object ->", object);
      console.log("Producto ->", producto);
      onUpdate(object);
    } catch (error) {
      toast.error("No se pudo obtener el producto");
      console.error(error);
    }
  };

  if (products.length === 0) {
    return <Alerta info="error" descripcion="No hay productos." />;
  }

  return (
    <>
      <Card
        sx={{
          overflowX: "auto",
        }}
      >
        <Box sx={{ minWidth: 800 }}>
          {searchProductos().length === 0 ? (
            <Alerta
              descripcion="No se ha podido encontrar ningun producto"
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
                  {searchProductos()
                    .slice(
                      pageProductos * rowsProductos,
                      pageProductos * rowsProductos + rowsProductos
                    )
                    .map((producto) => (
                      <TableRow hover key={producto.id}>
                        <TableCell align="center">{producto.nombre}</TableCell>
                        <TableCell align="center">
                          {numberFormat.format(producto.costo)}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Eliminar" arrow>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => deleteProducto(producto.id)}
                            >
                              <HiOutlineTrash />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar" arrow>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEdit(producto)}
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
                component="div"
                rowsPerPageOptions={[5, 10, 25]}
                count={searchProductos().length}
                rowsPerPage={rowsProductos}
                page={pageProductos}
                onPageChange={handleChangePageProductos}
                onRowsPerPageChange={handleChangeRowsPerPageProductos}
                labelRowsPerPage={labelRowsPerPage}
                labelDisplayedRows={labelDisplayedRows}
              />
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default TableProductos;
