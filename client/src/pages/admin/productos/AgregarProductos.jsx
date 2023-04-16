import {
  Button,
  Stack,
  Card,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/context/productos/ProductContext";
import {
  Header,
  Loader,
  PreparacionProductos,
  TabsAgregarProducto,
} from "@/components";

const AgregarProductos = () => {
  const { onSubmit, loading, methodsProducts, action } = useContext(
    ProductContext
  );
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/admin/productos");
  };

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Header
          title={
            action === "update" ? "Actualizar producto" : "Agregar producto"
          }
          subtitle="Añadir productos del restaurante."
        />
      </Stack>
      <form
        id="form"
        onSubmit={methodsProducts.handleSubmit(onSubmit)}
        ref={formRef}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <TabsAgregarProducto />

          {/* Card presentaciones */}
          <Card sx={{ width: "100%", p: "0.75rem" }}>
            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
              fontWeight="semibold"
            >
              Presentaciones
            </Typography>
            <Divider />
            <Box sx={{ my: "1.25rem" }}>
              <PreparacionProductos />
            </Box>
          </Card>
        </Box>
        <Box sx={{ mt: "1.25rem", display: "flex", gap: 1.5 }}>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            type="submit"
          >
            {loading ? <Loader /> : "Guardar"}
          </Button>
          <Button
            color="error"
            variant="contained"
            size="medium"
            type="button"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default AgregarProductos;
