import { useState, useEffect, useContext } from "react";
import { TomarOrdenContext } from "@/context/mesero/tomarOrden/TomarOrdenContext";
import { useParams, Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const columns = [
  { id: "producto", label: "Producto" },
  { id: "presentacion", label: "Presentacion" },
  { id: "precioUnitario", label: "Precio unitario" },
  { id: "cantidad", label: "Cantidad" },
  { id: "precioTotal", label: "Precio total" },
];

const options = {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
};
const numberFormat = new Intl.NumberFormat("es-CO", options);

const ConfirmarOrden = () => {
  const { carrito, setCarrito } = useContext(TomarOrdenContext);
  const [observaciones, setObservaciones] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    setCarrito(carritoGuardado || []);
  }, []);

  const total = carrito.reduce((accumulator, current) => {
    return accumulator + current.total;
  }, 0);

  const handleConfirmarOrden = () => {
    const orden = {
      mesa: id,
      carrito,
      observaciones,
      total,
    };
    console.log(orden);
  };

  return (
    <>
      <Box bgcolor="#E7EDF5" width="100%" p={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h4"
            color="#3E5571"
            fontWeight="bold"
            textAlign="center"
          >
            Confirmar orden
          </Typography>
          <Box bgcolor="#FFFFFF" borderRadius="md" p={1} mt={1}>
            <Typography variant="subtitle1">Mesa N°{id}</Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table sx={{ mt: 3 }}>
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
              {carrito?.map((detalle) => (
                <TableRow key={detalle.tamanio}>
                  <TableCell align="center" sx={{ backgroundColor: "#FFFFFF" }}>
                    {detalle.nombre}
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#FFFFFF" }}>
                    {detalle.tamanio}
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#FFFFFF" }}>
                    {numberFormat.format(detalle.costo)}
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#FFFFFF" }}>
                    {detalle.cantidad}
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#FFFFFF" }}>
                    {numberFormat.format(detalle.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Observaciones
          </Typography>
          <textarea
            name="observacion"
            cols="30"
            placeholder="Escribe las obseraciones que debe tener el pedido"
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        mt={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to={`/mesero/tomar-orden/${id}`}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<MdKeyboardBackspace />}
          >
            Volver
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={handleConfirmarOrden}
        >
          Realizar
        </Button>
      </Box>
    </>
  );
};

export default ConfirmarOrden;
