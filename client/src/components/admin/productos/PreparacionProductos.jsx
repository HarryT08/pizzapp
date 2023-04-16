import React, { useContext, useState } from "react";
import { Tab, Box, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  TableIngredientesProductos,
  InputIngrediente,
  ChipPreparations,
} from "@/components";
import { ProductContext } from "@/context/productos/ProductContext";

const PreparacionProductos = () => {
  const {
    producto,
    preparaciones,
    setPreparaciones,
    preparations,
    listaCostoTamanio,
    setListaCostoTamanio,
  } = useContext(ProductContext);

  const [selectedTab, setSelectedTab] = useState(() => {
    return listaCostoTamanio.at(-1) || "";
  });

  const handleChecked = (e, key) => {
    const isChecked = e.target.checked;

    const value = key;

    if (isChecked) {
      if (key === "unico") {
        setListaCostoTamanio([value]);
      } else {
        const listaCostoTamanioSinUnico = listaCostoTamanio.filter(
          (item) => item !== "unico"
        );
        setListaCostoTamanio([...listaCostoTamanioSinUnico, value]);
      }
      setSelectedTab(key);
    } else {
      setListaCostoTamanio((prev) => prev.filter((item) => item !== value));
    }
  };

  const deleteIngrediente = (id) => {};

  return (
    <>
      <ul
        className="ks-cboxtags"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.25rem",
        }}
      >
        {Object.entries(preparations).map(([key, value]) => (
          <li key={key}>
            <input
              type="checkbox"
              id={key}
              value={key}
              checked={listaCostoTamanio.includes(key)}
              // disabled={listaCostoTamanio.includes("unico")}
              onChange={(e) => handleChecked(e, key)}
            />
            <label htmlFor={key}>{value}</label>
          </li>
        ))}
      </ul>
      <TableIngredientesProductos />
      <Box
        sx={{
          mt: "0.5rem",
        }}
      >
        {selectedTab && (
          <TabContext value={selectedTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(event, value) => {
                  setSelectedTab(value);
                }}
              >
                {listaCostoTamanio.map((item) => (
                  <Tab key={item} label={item} value={item} />
                ))}
              </TabList>
            </Box>
            {/* {selectedPreparations.map((size) => (
            <TabPanel value={size.key} key={size.key}>
              {preparaciones
                .filter((preparacion) => preparacion.tamanio === selectedTab)
                .map((it) => (
                  <InputIngrediente
                    key={`${preparacion.id_materia}-${preparacion.tamanio}`}
                    preparacion={preparacion}
                    onDelete={deleteIngrediente}
                  />
                ))}
            </TabPanel>
          ))} */}
          </TabContext>
        )}
      </Box>
    </>
  );
};

export default PreparacionProductos;
