import { useState, useContext } from "react";
import { SelectedProductContext } from "@/context/productos/ProductContext";
import { TomarOrdenContext } from "@/context/mesero/tomarOrden/TomarOrdenContext";
import { Alerta } from "@/components";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

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

const TableProductosMesero = ({ searchProductos }) => {
  const { loading, products } = useContext(SelectedProductContext);
  const {
    tamaniosSeleccionados,
    setTamaniosSeleccionados,
    carrito,
    setCarrito,
  } = useContext(TomarOrdenContext);
  const [pageProductos, setPageProductos] = useState(0);
  const [rowsProductos, setRowsProductos] = useState(10);

  // Paginacion tabla Ingredientes
  const handleChangePageProductos = (event, newPage) => {
    setPageProductos(newPage);
  };
  const handleChangeRowsPerPageProductos = (event) => {
    setRowsProductos(+event.target.value);
    setPageProductos(0);
  };

  /* Funcion para seleccionar el tamanio + precio */
  const handleTamanioSeleccionado = (item) => {
    const tamanioSeleccionado = {
      id: item.id,
      tamanio: item.tamanio,
      precio: item.costo,
    };
    if (tamaniosSeleccionados.some((t) => t.id === tamanioSeleccionado.id)) {
      setTamaniosSeleccionados(
        tamaniosSeleccionados.filter((t) => t.id !== tamanioSeleccionado.id)
      );
    } else {
      setTamaniosSeleccionados([...tamaniosSeleccionados, tamanioSeleccionado]);
    }
  };

  /* Funcion para seleccionar el productos y añadirle CostoProductoTamanio */
  const handleAgregarProducto = (producto) => {
    if (tamaniosSeleccionados.length === 0) {
      toast.error("Debe seleccionar al menos un tamaño");
      return;
    }

    // Verificar si el producto ya esta en el carrito por ID y tamanio
    const productoExistente = carrito.find(
      (p) =>
        p.id === producto.id && p.tamanio === tamaniosSeleccionados[0].tamanio
    );
    if (productoExistente) {
      toast.error("El producto ya se encuentra en el carrito");
      return;
    }

    const nuevosProductos = tamaniosSeleccionados.map((tamanio) => ({
      id: producto.id,
      nombre: producto.nombre,
      tamanio: tamanio.tamanio,
      costo: tamanio.precio,
      cantidad: 0,
      total: 0,
    }));

    // Agregar los nuevos productos al carrito
    setCarrito([...carrito, ...nuevosProductos]);
    setTamaniosSeleccionados([]);
  };

  return (
    <>
      <Card
        sx={{
          overflowX: "auto",
        }}
      >
        <Box sx={{ minWidth: 800 }}>
          {loading ? (
            <div className="loader"></div>
          ) : products.length === 0 ? (
            <Alerta
              descripcion="No se ha creado ningun producto"
              alerta="info"
            />
          ) : searchProductos().length === 0 ? (
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
                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {producto.costoProductoTamanio.map((item) => (
                            <Box key={item.id}>
                              <Checkbox
                                checked={tamaniosSeleccionados.some(
                                  (t) => t.id === item.id
                                )}
                                onChange={() => handleTamanioSeleccionado(item)}
                              />
                              <Typography
                                sx={{
                                  textTransform: "uppercase",
                                  fontWeight: "500",
                                  backgroundColor: "#1e88e5",
                                  color: "#fff",
                                  padding: "2px",
                                  borderRadius: "5px",
                                  fontSize: "12px",
                                }}
                              >
                                {item.tamanio}
                              </Typography>
                              <div>{numberFormat.format(item.costo)}</div>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            type="button"
                            variant="outlined"
                            onClick={() => handleAgregarProducto(producto)}
                          >
                            Agregar
                          </Button>
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

export default TableProductosMesero;
