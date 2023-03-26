import { useState, useContext } from "react";
import { OrdenesContext } from "@/context/ordenes/OrdenesContext";
import { Tab, Tabs, Box } from "@mui/material";
import { TableOrdenes, DrawerOrdenes } from "@/components";

const TabsOrdenes = () => {
  const { comandas } = useContext(OrdenesContext);
  const [value, setValue] = useState("Todas");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let filteredComandas = comandas;
  if (value !== "Todas") {
    filteredComandas = comandas?.filter(
      (comandas) => comandas.estado === value
    );
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Ordenes tabs"
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tab value="Todas" label="Todas" />
        <Tab value="Abierta" label="Abierta" />
        <Tab value="Facturado" label="Facturado" />
      </Tabs>
      <TableOrdenes filterComandas={filteredComandas} />
      <DrawerOrdenes />
    </>
  );
};

export default TabsOrdenes;
