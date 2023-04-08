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
  const handleTamanioSeleccionado = (producto, tamanio, costo, itemId) => {
    const productoTamanioSeleccionado = {
      idProducto: producto.id,
      idTamanio: itemId,
      nombre: producto.nombre,
      tamanio: tamanio,
      cantidad: 1,
      total: costo,
      costo: costo,
    };
    if (
      tamaniosSeleccionados.some(
        (t) =>
          t.idProducto === productoTamanioSeleccionado.idProducto &&
          t.tamanio === productoTamanioSeleccionado.tamanio
      )
    ) {
      setTamaniosSeleccionados(
        tamaniosSeleccionados.filter(
          (t) =>
            t.idProducto !== productoTamanioSeleccionado.idProducto ||
            t.tamanio !== tamanio
        )
      );
    } else {
      setTamaniosSeleccionados([
        ...tamaniosSeleccionados,
        productoTamanioSeleccionado,
      ]);
    }
  };

  const limpiarTamaniosSeleccionados = (productoAgregado) => {
    setTamaniosSeleccionados((tamaniosSeleccionados) => {
      return tamaniosSeleccionados.filter(
        (tamanioSeleccionado) =>
          tamanioSeleccionado.idProducto !== productoAgregado.id ||
          !productoAgregado.costoProductoTamanio.some(
            (tamanio) =>
              tamanioSeleccionado.tamanio === tamanio.tamanio &&
              tamanioSeleccionado.costo === tamanio.costo
          )
      );
    });
  };

  const handleAgregarProducto = (producto, id) => {
    const tamaniosSeleccionadosParaProducto = tamaniosSeleccionados.filter(
      (tamanio) => tamanio.idProducto === id
    );

    if (tamaniosSeleccionadosParaProducto.length === 0) {
      toast.error("Debe seleccionar al menos un tamaño");
      return;
    }

    let tamanioRepetidoEnCarrito = false;
    carrito.forEach((item) => {
      if (item.id === producto.id) {
        item.costoProductoTamanio.forEach((tamanio) => {
          if (
            tamanio.tamanio === tamaniosSeleccionadosParaProducto[0].tamanio
          ) {
            tamanioRepetidoEnCarrito = true;
          }
        });
      }
    });

    if (tamanioRepetidoEnCarrito) {
      toast.error("No se puede agregar el mismo tamaño");
      return;
    }

    let productoAgregado = false;
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === producto.id) {
        productoAgregado = true;
        return {
          ...item,
          total: item.total + tamaniosSeleccionadosParaProducto[0].total,
          costoProductoTamanio: [
            ...item.costoProductoTamanio,
            tamaniosSeleccionadosParaProducto[0],
          ],
        };
      } else {
        return item;
      }
    });

    const totalProductoInicial = tamaniosSeleccionadosParaProducto.reduce(
      (total, tamanio) => total + tamanio.total,
      0
    );
    if (!productoAgregado) {
      nuevoCarrito.push({
        id: producto.id,
        total: totalProductoInicial,
        costoProductoTamanio: tamaniosSeleccionadosParaProducto,
      });
    }

    setCarrito(nuevoCarrito);
    limpiarTamaniosSeleccionados(producto);
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
                                // Cambiar el valor del checked para que se seleccione el tamaño y tambien se pueda deseleccionar
                                checked={
                                  tamaniosSeleccionados.find(
                                    (t) =>
                                      t.idProducto === producto.id &&
                                      t.tamanio === item.tamanio
                                  ) !== undefined
                                }
                                onChange={() =>
                                  handleTamanioSeleccionado(
                                    producto,
                                    item.tamanio,
                                    item.costo,
                                    item.id
                                  )
                                }
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
                            onClick={() =>
                              handleAgregarProducto(producto, producto.id)
                            }
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
