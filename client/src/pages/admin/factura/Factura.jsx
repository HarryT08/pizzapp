import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { bohemiaApi } from "@/api/bohemiaApi";
import { Loader } from "@/components";
import { toast } from "react-toastify";

const columns = [
  { id: "producto", label: "Producto" },
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

const Factura = () => {
  const [comanda, setComanda] = useState({ detalleComanda: [] });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getComanda = async () => {
    try {
      const response = await bohemiaApi.get(`/comanda/${id}`, {
        params: { estado: "Abierta" },
      });
      setComanda(response.data);
    } catch (error) {
      toast.error("Error al obtener la comanda");
      console.log(error);
    }
  };

  const updateStateComanda = async () => {
    try {
      setLoading(true);
      await bohemiaApi.put(`/comanda/${id}`, {
        estado: "Facturado",
      });
      updateMesa();
      setTimeout(() => {
        navigate("/admin/facturar");
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log("Error en updateStateComanda " + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getComanda();
  }, []);

  console.log("Comanda ->", comanda);
  return (
    <>
      <Box bgcolor="#E7EDF5" width="100%" p={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" color="#3E5571" fontWeight="bold">
            Comprobante de venta
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
                  <TableCell
                    key={column.id}
                    sx={{
                      color: "#3E5571",
                      fontWeight: "bold",
                      border: "1px solid #91A7BF",
                      borderColor: "#91A7BF",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {comanda.detalleComanda.map((detalle) => (
                <TableRow key={detalle.id} className="bodyTable">
                  <TableCell
                    style={{
                      color: "#3E5571",
                      border: "1px solid #91A7BF",
                      borderColor: "#91A7BF",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {detalle.producto.nombre}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#3E5571",
                      border: "1px solid #91A7BF",
                      borderColor: "#91A7BF",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {numberFormat.format(
                      detalle.totalComanda / detalle.cantidad
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#3E5571",
                      border: "1px solid #91A7BF",
                      borderColor: "#91A7BF",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {detalle.cantidad}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#3E5571",
                      border: "1px solid #91A7BF",
                      borderColor: "#91A7BF",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {numberFormat.format(detalle.totalComanda)}
                  </TableCell>
                </TableRow>
              ))}
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
              {numberFormat.format(comanda.total)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        mt={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/admin/facturar">
          <Button variant="contained" color="primary" href="/admin/facturar">
            Regresar
          </Button>
        </Link>
        <Box display="flex" alignItems="center" gap="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={updateStateComanda}
            disabled={loading}
          >
            {loading ? <Loader /> : "Facturar"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.print()}
          >
            Imprimir
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Factura;
