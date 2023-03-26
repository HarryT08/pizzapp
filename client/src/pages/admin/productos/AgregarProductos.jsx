import {
  Button,
  Stack,
  Card,
  TextField,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SelectedProductContext } from "@/context/productos/ProductContext";
import { Header, Loader, Alerta, PreparacionProductos } from "@/components";
import { Controller } from "react-hook-form";

const AgregarProductos = () => {
  const { onSubmit, loading, selectedPreparations, methodsProducts } =
    useContext(SelectedProductContext);
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
          title="Agregar productos"
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
          <Card sx={{ width: "100%", p: "0.75rem" }}>
            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
              fontWeight="semibold"
            >
              Producto
            </Typography>
            <Divider />
            <Box sx={{ my: "1.25rem" }}>
              <Controller
                control={methodsProducts.control}
                name="nombre"
                rules={{
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField
                      {...field}
                      label="Nombre"
                      variant="outlined"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  );
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
              fontWeight="semibold"
            >
              Precios
            </Typography>
            <Divider />
            <Box
              sx={{
                mt: "1.25rem",
                display: "flex",
                flexWrap: "wrap",
                columnGap: "0.5rem",
                rowGap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedPreparations.length === 0 ? (
                <Alerta
                  descripcion="No se ha seleccionado ninguna presentacion."
                  alerta="info"
                />
              ) : (
                Object.entries(selectedPreparations).map(([key, value]) => (
                  <div key={key}>
            
                    <Controller
                      name={`costos.${value.key}`}
                      control={methodsProducts.control}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label={value.value}
                            variant="outlined"
                            type="number"
                          />
                        );
                      }}
                    />
                  </div>
                ))
              )}
            </Box>
          </Card>
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
