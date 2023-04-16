import { useContext, useEffect } from "react";
import { SelectedProductContext } from "@/context/productos/ProductContext";
import {
  Card,
  TextField,
  Box,
  Typography,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Alerta } from "@/components";

const TabsAgregarProducto = () => {
  const { selectedPreparations, methodsProducts, category, setCategory } =
    useContext(SelectedProductContext);

  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  //Si se cierra una preparacion, limpia los campos
  useEffect(() => {
    methodsProducts.reset();
  }, [selectedPreparations]);

  return (
    <>
      <Card sx={{ width: "100%", p: "0.75rem" }}>
        <Tabs value={category} onChange={handleChange}>
          <Tab label="Producto" value="Producto" />
          <Tab label="Adicion" value="Adicion" />
        </Tabs>
        {category === "Producto" || category === "Adicion" ? (
          <>
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
                    {console.log("value ->", value, "key ->", key)}
                    <Controller
                      name={`costos.${value.key}`}
                      rules={{
                        required: {
                          value: true,
                          message: "No ha ingresado un precio",
                        },
                      }}
                      control={methodsProducts.control}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <TextField
                            {...field}
                            label={value.value}
                            variant="outlined"
                            type="number"
                            error={error ? true : false}
                            helperText={error?.message}
                          />
                        );
                      }}
                    />
                  </div>
                ))
              )}
            </Box>
          </>
        ) : null}
      </Card>
    </>
  );
};

export default TabsAgregarProducto;
