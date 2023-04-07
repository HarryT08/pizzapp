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
    const total = carrito.reduce((acc, { cantidad, costo }) => {
      return acc + cantidad * costo;
    }, 0);
    setSubtotal(total);
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCleanCarrito = (tamanio) => {
    const cleanCarrito = carrito.filter((producto) => {
      return producto.tamanio !== tamanio;
    });
    setCarrito(cleanCarrito);
  };

  const handleIncrement = (tamanio) => {
    const newCarrito = carrito.map((producto) => {
      if (producto.tamanio === tamanio) {
        const nuevaCantidad = producto.cantidad + 1;
        const nuevoTotal = nuevaCantidad * producto.costo;
        return {
          ...producto,
          cantidad: nuevaCantidad,
          total: nuevoTotal,
        };
      }
      return producto;
    });
    setCarrito(newCarrito);
  };

  console.log("Carrito ->", carrito);

  const handleDecrement = (tamanio) => {
    const newCarrito = carrito.map((producto) => {
      if (producto.tamanio === tamanio) {
        const nuevaCantidad = producto.cantidad - 1;
        if (nuevaCantidad < 1) {
          toast.error("No puedes tener menos de 1 productos");
          return producto;
        }
        const nuevoTotal = nuevaCantidad * producto.costo;
        return {
          ...producto,
          cantidad: nuevaCantidad,
          total: nuevoTotal,
        };
      }
      return producto;
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
                  sx={{
                    borderBottom: "1px solid #E6E8F0",
                  }}
                >
                  <Box
                    key={c.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">{c.nombre}</Typography>
                    <IconButton
                      color="warning"
                      onClick={() => handleCleanCarrito(c.tamanio)}
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
                        mb: "5px",
                      }}
                    >
                      <Typography variant="body1">{c.tamanio}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          color="success"
                          size="medium"
                          onClick={() => handleIncrement(c.tamanio)}
                        >
                          <MdKeyboardArrowUp />
                        </IconButton>
                        <Typography variant="body1">{c.cantidad}</Typography>
                        <IconButton
                          color="error"
                          size="medium"
                          onClick={() => handleDecrement(c.tamanio)}
                        >
                          <MdKeyboardArrowDown />
                        </IconButton>
                      </Box>
                      <Typography variant="body1">
                        {numberFormat.format(c.total)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    SubTotal: {numberFormat.format(c.total)}
                  </Typography>
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
