import { useContext } from "react";
import { OrdenesContext } from "@/context/ordenes/OrdenesContext";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};

const numberFormat = new Intl.NumberFormat("es-CO", options);

const DrawerOrdenes = () => {
  const { open, setOpen, orderById, numOrden, comandas } =
    useContext(OrdenesContext);

  const handleClose = () => {
    setOpen(false);
  };

  /* Encontrar la fecha de la orden */
  const comandaFecha = comandas.find((comanda) => comanda.id === numOrden);
  const fechaISO = comandaFecha ? comandaFecha.fecha : null;

  // Crear instancia de fecha a partir de la cadena ISO
  const fecha = fechaISO ? new Date(fechaISO) : null;

  // Crear objeto Intl.DateTimeFormat para formatear la fecha
  const formatter = new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Formatear la fecha si existe
  const fechaFormateada = fecha ? formatter.format(fecha) : null;

  /* Calcular total de la comanda */
  function calcularTotalGeneral(comandas) {
    let total = 0;
    for (let i = 0; i < comandas.length; i++) {
      total += comandas[i].totalComanda;
    }
    return numberFormat.format(total);
  }

  const totalGeneral = calcularTotalGeneral(orderById);

  /* Encontrar el estado de la orden */
  const comandaEstado = comandas.find((comanda) => comanda.id === numOrden);
  const estado = comandaEstado ? comandaEstado.estado : null;

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
          <Typography variant="h6">Orden {numOrden}</Typography>
          <IconButton onClick={handleClose}>
            <IoClose />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ marginBottom: "30px" }}>
            Detalles
          </Typography>
          <Stack spacing={3}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body1" sx={{ marginBottom: "2px" }}>
                Productos
              </Typography>
              {Object.entries(orderById).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "3px",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="neutral.500"
                    fontWeight="bold"
                    textAlign="left"
                  >
                    {value.cantidad}
                  </Typography>
                  <Typography variant="body2" color="neutral.500">
                    {value.producto.nombre}
                  </Typography>
                  -
                  <Typography variant="body2" color="neutral.500">
                    {value.tamanio}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body2"
                      color="neutral.500"
                      fontWeight="bold"
                    >
                      {numberFormat.format(value.totalComanda / value.cantidad)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body1" sx={{ marginBottom: "2px" }}>
                Fecha
              </Typography>
              {fechaFormateada && (
                <Typography variant="body2" color="neutral.500">
                  {fechaFormateada}
                </Typography>
              )}
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="body1">Total de la orden</Typography>
              {totalGeneral && (
                <Typography variant="body2" color="neutral.500">
                  {totalGeneral}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body1">Estado</Typography>
              {estado && <span className={`${estado}`}>{estado}</span>}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerOrdenes;
