import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { DashboarLayout } from "@/components";
import {
  RealizarPedido,
  TomarOrden,
  ConfirmarOrden,
  EditarPedido,
} from "@/pages";
import {
  INDEX_MESERO,
  REALIZAR_PEDIDO_MESERO,
  TOMAR_ORDEN_MESERO,
  CONFIRMAR_ORDEN_MESERO,
  EDITAR_PEDIDO_MESERO,
} from "@/routes/paths";

import { ProductProvider } from "@/context/productos/ProductContext";
import { TomarOrdenProvider } from "@/context/mesero/tomarOrden/TomarOrdenContext";

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
            <Route
              path={`${TOMAR_ORDEN_MESERO}/:id`}
              element={
                <ProductProvider>
                  <TomarOrdenProvider>
                    <TomarOrden />
                  </TomarOrdenProvider>
                </ProductProvider>
              }
            />
            <Route
              path={`${CONFIRMAR_ORDEN_MESERO}/:id`}
              element={
                <TomarOrdenProvider>
                  <ConfirmarOrden />
                </TomarOrdenProvider>
              }
            />
            <Route path={EDITAR_PEDIDO_MESERO} element={<EditarPedido />} />
          </Routes>
        </Container>
      </Box>
    </DashboarLayout>
  );
};

export default DashboardMesero;
