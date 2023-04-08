import { useState } from "react";
import { TableProductos } from "@/components";
import { Tab, Tabs } from "@mui/material";

const TabsProductos = ({ searchProductos }) => {
  const [value, setValue] = useState("Productos");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Productos" value="Productos" />
        <Tab label="Adiciones" value="Adiciones" />
      </Tabs>
      {value === "Productos" && (
        <TableProductos searchProductos={searchProductos} />
      )}
      {value === "Adiciones" && <p>Tabla adiciones</p>}
    </>
  );
};

export default TabsProductos;
