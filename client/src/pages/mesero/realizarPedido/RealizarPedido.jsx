import { useState, useEffect } from "react";
import { bohemiaApi } from "@/api/bohemiaApi";
import { Header, Alerta, MesasDisponibles } from "@/components";
import {
  Stack,
  Box,
  Grid,
} from "@mui/material";

const RealizarPedido = () => {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMesas = async () => {
    try {
      setLoading(true);
      const response = await bohemiaApi.get("/mesas/Disponible");
      setMesas(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getMesas();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Header
          title="Realizar Pedidos"
          subtitle="Selecciona una mesa para tomar el pedido."
        />
      </Stack>
      <Box sx={{ mt: 3 }}>
        {loading ? (
          <div className="loader"></div>
        ) : mesas.length === 0 ? (
          <Alerta alerta="info" descripcion="No hay mesas registradas" />
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {mesas.map((mesa) => {
              const colorEstado =
                mesa.estado === "Disponible" ? "#008000" : "#e63946";
              return (
                <MesasDisponibles
                  key={mesa.id}
                  colorEstado={colorEstado}
                  estado={mesa.estado}
                  numeroMesa={mesa.id}
                />
              );
            })}
          </Grid>
        )}
      </Box>
    </Stack>
  );
};

export default RealizarPedido;
