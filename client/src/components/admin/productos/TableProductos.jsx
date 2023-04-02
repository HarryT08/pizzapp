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
  Typography,
} from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { Alerta } from "@/components";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import * as productosServices from "@/services/productos/productos";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const {
    getProductos,
    onUpdate,
    products,
    methodsProducts,
    setSelectedPreparations,
    preparations,
    loading,
  } = useContext(SelectedProductContext);
  const navigate = useNavigate();

  console.log("Productos ->", products);

  // Paginacion tabla Ingredientes
  const handleChangePageProductos = (event, newPage) => {
    setPageProductos(newPage);
  };

  const formatearObjetoProductoCostos = (objeto) => {
    const nuevoObjetoCostos = {
      mediana: "",
      grande: "",
      pequeña: "",
      unico: "",
    };
    objeto.forEach((item) => {
      switch (item.tamanio) {
        case "mediana":
          nuevoObjetoCostos.mediana = item.costo;
          break;
        case "grande":
          nuevoObjetoCostos.grande = item.costo;
          break;
        case "pequeña":
          nuevoObjetoCostos.pequeña = item.costo;
          break;
        case "unico":
          nuevoObjetoCostos.unico = item.costo;
          break;
        default:
          break;
      }
    });

    return { ...nuevoObjetoCostos };
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
      const objectProductoConPreparaciones =
        await productosServices.getProductoAndPreparaciones(producto.id);

      const costosProducto = formatearObjetoProductoCostos(
        producto.costoProductoTamanio
      );

      methodsProducts.reset({
        ...objectProductoConPreparaciones,
        costos: costosProducto,
      });
      setSelectedPreparations(() => {
        return (
          methodsProducts.getValues("selectedSizes")?.map((item) => ({
            key: item,
            value: preparations[item],
          })) || []
        );
      });

      navigate("/admin/productos/editar");

      onUpdate(objectProductoConPreparaciones);
    } catch (error) {
      toast.error("No se pudo obtener el producto");
      console.error(error);
    }
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
