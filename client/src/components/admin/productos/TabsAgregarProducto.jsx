import { useState, useContext } from "react";
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
          </>
        ) : null}
      </Card>
    </>
  );
};

export default TabsAgregarProducto;
