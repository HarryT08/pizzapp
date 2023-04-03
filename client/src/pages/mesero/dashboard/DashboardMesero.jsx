import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { DashboarLayout } from "@/components";
import { RealizarPedido, EditarPedido } from "@/pages";
import {
  INDEX_MESERO,
  REALIZAR_PEDIDO_MESERO,
  TOMAR_ORDEN_MESERO,
  EDITAR_PEDIDO_MESERO,
} from "@/routes/paths";

const DashboardMesero = () => {
  return (
    <DashboarLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Routes>
            <Route path={INDEX_MESERO} element={<RealizarPedido />} />
            <Route path={REALIZAR_PEDIDO_MESERO} element={<RealizarPedido />} />
            <Route path={EDITAR_PEDIDO_MESERO} element={<EditarPedido />} />
          </Routes>
        </Container>
      </Box>
    </DashboarLayout>
  );
};

export default DashboardMesero;
