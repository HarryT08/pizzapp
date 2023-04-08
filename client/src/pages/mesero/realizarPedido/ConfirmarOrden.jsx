import { useState, useEffect, useContext } from "react";
import { TomarOrdenContext } from "@/context/mesero/tomarOrden/TomarOrdenContext";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import * as comandasServices from "@/services/comanda/comanda";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Loader } from "@/components";

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
  const [loading, setLoading] = useState(false);
  const [observaciones, setObservaciones] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

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
      data: carrito,
      observaciones,
    }
    console.log("orden", orden);
    // try {
    //   setLoading(true);
    //   comandasServices.createComandas({
    //     mesa: id,
    //     carrito,
    //     observaciones,
    //     total,
    //   });
    //   toast.success("Orden creada con exito");
    //   navigate("/mesero/realizar-pedido");
    //   setCarrito([]);
    //   setLoading(false);
    // } catch (error) {
    //   toast.error("Error al crear la orden");
    //   console.log(error);
    // }
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
              {carrito.map((producto) => {
                return Object.entries(producto.costoProductoTamanio).map(
                  ([key, item]) => (
                    <TableRow key={`${producto.id}-${key}`}>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        {item.nombre}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        {item.tamanio}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        {numberFormat.format(item.costo)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        {item.cantidad}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        {numberFormat.format(item.total)}
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          mt={2}
        >
          <Typography variant="subtitle1">Total a pagar:</Typography>
          <Box
            bgcolor="#FFFFFF"
            borderRadius="md"
            p={1}
            ml={1}
            border="1px solid #91A7BF"
            borderColor="#91A7BF"
          >
            <Typography variant="h6" fontWeight="medium">
              {numberFormat.format(total)}
            </Typography>
          </Box>
        </Box>
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
          {loading ? <Loader /> : "Realizar"}
        </Button>
      </Box>
    </>
  );
};

export default ConfirmarOrden;
