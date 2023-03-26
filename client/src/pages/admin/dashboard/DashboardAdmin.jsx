import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { DashboarLayout } from "@/components";
import {
  Inicio,
  Productos,
  AgregarProductos,
  Ingredientes,
  Bebidas,
  Ordenes,
  Cuentas,
  Mesas,
  Factura,
} from "@/pages";
import {
  INDEX_ADMIN,
  INICIO_ADMIN,
  PRODUCTOS_ADMIN,
  AGREGAR_PRODUCTO_ADMIN,
  INGREDIENTES_ADMIN,
  BEBIDAS_ADMIN,
  ORDENES_ADMIN,
  CUENTAS_ADMIN,
  MESAS_ADMIN,
  FACTURAR_ADMIN,
} from "@/routes/paths";

import { IngredienteProvider } from "@/context/ingredientes/IngredientesContext";
import { OrdenesProvider } from "@/context/ordenes/OrdenesContext";
import { ProductProvider } from "@/context/productos/ProductContext";
import { CuentasProvider } from "@/context/cuentas/CuentasContext";

const DashboardAdmin = () => {
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
            <Route
              path={INDEX_ADMIN}
              element={
                <ProductProvider>
                  <Inicio />
                </ProductProvider>
              }
            />
            <Route
              path={INICIO_ADMIN}
              element={
                <ProductProvider>
                  <Inicio />
                </ProductProvider>
              }
            />
            <Route
              path={PRODUCTOS_ADMIN}
              element={
                <ProductProvider>
                  <Productos />
                </ProductProvider>
              }
            />
            <Route
              path={AGREGAR_PRODUCTO_ADMIN}
              element={
                <ProductProvider>
                  <IngredienteProvider>
                    <AgregarProductos />
                  </IngredienteProvider>
                </ProductProvider>
              }
            />
            <Route
              path={INGREDIENTES_ADMIN}
              element={
                <IngredienteProvider>
                  <Ingredientes />
                </IngredienteProvider>
              }
            />
            <Route path={BEBIDAS_ADMIN} element={<Bebidas />} />
            <Route
              path={ORDENES_ADMIN}
              element={
                <OrdenesProvider>
                  <Ordenes />
                </OrdenesProvider>
              }
            />
            <Route
              path={CUENTAS_ADMIN}
              element={
                <CuentasProvider>
                  <Cuentas />
                </CuentasProvider>
              }
            />
            <Route path={MESAS_ADMIN} element={<Mesas />} />
            <Route path={FACTURAR_ADMIN} element={<Factura />} />
          </Routes>
        </Container>
      </Box>
    </DashboarLayout>
  );
};

export default DashboardAdmin;
