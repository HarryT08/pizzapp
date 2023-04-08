import { useContext, useEffect } from "react";
import { TomarOrdenContext } from "@/context/mesero/tomarOrden/TomarOrdenContext";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  useMediaQuery,
  Divider,
  Button,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import { Alerta } from "@/components";

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};
const numberFormat = new Intl.NumberFormat("es-CO", options);

const DrawerCarrito = ({ setOpen, open }) => {
  const { carrito, setCarrito, subTotal, setSubtotal } =
    useContext(TomarOrdenContext);
  const { id } = useParams();

  useEffect(() => {
    const subtotal = carrito.reduce((total, producto) => {
      const totalProducto = producto.costoProductoTamanio.reduce(
        (total, item) => total + item.costo * item.cantidad,
        0
      );
      return total + totalProducto;
    }, 0);
    setSubtotal(subtotal);
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCleanCarrito = (tamanio, idTamanio) => {
    const cleanCarrito = carrito
      .map((producto) => {
        const newCostoProductoTamanio = producto.costoProductoTamanio.filter(
          (item) => {
            if (item.tamanio === tamanio && item.idTamanio === idTamanio) {
              return false;
            }
            return true;
          }
        );
        const totalProducto = newCostoProductoTamanio.reduce(
          (total, item) => total + item.costo * item.cantidad,
          0
        );
        return {
          ...producto,
          costoProductoTamanio: newCostoProductoTamanio,
          total: totalProducto,
        };
      })
      .filter((producto) => producto.costoProductoTamanio.length > 0);
    setCarrito(cleanCarrito);
  };

  const handleIncrement = (tamanio, idTamanio) => {
    const newCarrito = carrito.map((producto) => {
      const newCostoProductoTamanio = producto.costoProductoTamanio.map(
        (item) => {
          if (item.tamanio === tamanio && item.idTamanio === idTamanio) {
            const nuevaCantidad = item.cantidad + 1;
            const nuevoTotal = nuevaCantidad * item.costo;
            return {
              ...item,
              cantidad: nuevaCantidad,
              total: nuevoTotal,
            };
          }
          return item;
        }
      );
      const totalProducto = newCostoProductoTamanio.reduce(
        (total, item) => total + item.total,
        0
      );
      return {
        ...producto,
        costoProductoTamanio: newCostoProductoTamanio,
        total: totalProducto,
      };
    });
    setCarrito(newCarrito);
  };

  const handleDecrement = (tamanio, idTamanio) => {
    const newCarrito = carrito.map((producto) => {
      const newCostoProductoTamanio = producto.costoProductoTamanio.map(
        (item) => {
          if (item.tamanio === tamanio && item.idTamanio === idTamanio) {
            const nuevaCantidad = item.cantidad - 1;
            if (nuevaCantidad < 1) {
              toast.error("No puedes tener menos de 1 producto");
              return item;
            }
            const nuevoTotal = nuevaCantidad * item.costo;
            return {
              ...item,
              cantidad: nuevaCantidad,
              total: nuevoTotal,
            };
          }
          return item;
        }
      );
      const totalProducto = newCostoProductoTamanio.reduce(
        (total, item) => total + item.total,
        0
      );
      return {
        ...producto,
        costoProductoTamanio: newCostoProductoTamanio,
        total: totalProducto,
      };
    });
    setCarrito(newCarrito);
  };

  // Breakpoints drawer
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          width: isSmall
            ? "100vw"
            : isMedium
            ? "400px"
            : isLarge
            ? "400px"
            : "400px",
          padding: "16px 24px",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h6">Carrito pedidos</Typography>
          <IconButton color="warning" onClick={handleClose}>
            <IoClose />
          </IconButton>
        </Box>
        {carrito.length === 0 ? (
          <Alerta alerta="info" descripcion="El carrito esta vacio" />
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">Total Orden</Typography>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: "10px",
                  backgroundColor: "red",
                  paddingX: "5px",
                  borderRadius: "6px",
                  color: "#FFFFFF",
                }}
              >
                {numberFormat.format(subTotal)}
              </Typography>
              <Link to={`/mesero/confirmar-orden/${id}`}>
                <Button size="small" variant="outlined" color="primary">
                  Confirmar orden
                </Button>
              </Link>
            </Box>
            <Divider sx={{ my: "5px" }} />
            <Box>
              <Typography variant="h6">Productos</Typography>
              {carrito.map((c) => (
                <Box
                  key={c.id}
                  sx={{
                    backgroundColor: "#f8f9fa",
                    padding: "5px",
                    marginY: "10px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.18)",
                  }}
                >
                  {c.costoProductoTamanio.map((item) => (
                    <>
                      <Box
                        key={item.idTamanio}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "500",
                          }}
                        >
                          {item.nombre}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleCleanCarrito(item.tamanio, item.idTamanio)
                          }
                        >
                          <IoClose />
                        </IconButton>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #dee2e6",
                            mb: "5px",
                          }}
                        >
                          <Typography variant="body1">
                            {item.tamanio}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              color="success"
                              size="medium"
                              onClick={() =>
                                handleIncrement(item.tamanio, item.idTamanio)
                              }
                            >
                              <MdKeyboardArrowUp />
                            </IconButton>
                            <Typography variant="body1">
                              {item.cantidad}
                            </Typography>
                            <IconButton
                              color="error"
                              size="medium"
                              onClick={() =>
                                handleDecrement(item.tamanio, item.idTamanio)
                              }
                            >
                              <MdKeyboardArrowDown />
                            </IconButton>
                          </Box>
                          <Typography variant="body1">
                            {numberFormat.format(item.total)}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "500" }}>
                      SubTotal:
                    </Typography>
                    <Typography variant="body1">
                      {numberFormat.format(c.total)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerCarrito;
