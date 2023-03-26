import { useContext, useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  TableIngredientesProductos,
  InputIngrediente,
  ChipPreparations,
} from "@/components";
import { SelectedProductContext } from "@/context/productos/ProductContext";

const PreparacionProductos = () => {
  const {
    producto,
    preparaciones,
    setPreparaciones,
    selectedPreparations,
    setSelectedPreparations,
    preparations,
  } = useContext(SelectedProductContext);

  const [selectedTab, setSelectedTab] = useState(
    () => producto.selectedSizes.at(-1) || ""
  );

  const handleChecked = (e, size) => {
    if (!e.target.checked) {
      const nextSizes = selectedPreparations.filter((a) => a.key !== size.key);
      setSelectedTab(nextSizes.at(-1)?.key || "");
      setSelectedPreparations(nextSizes);
      setPreparaciones((draft) =>
        draft.filter((it) => it.tamanio !== size.key)
      );
      return;
    }

    if (size.key === "unico") {
      setSelectedTab("unico");
      setSelectedPreparations([size]);
      setPreparaciones((draft) => draft.filter((it) => it.tamanio !== "unico"));
      return;
    }

    setSelectedTab(size.key);
    setSelectedPreparations((current) => [...current, size]);

    const record = {};

    preparaciones.forEach(
      (item) => (record[item.id_materia] = item.materiaPrima)
    );

    const newPreparaciones = Object.values(record).map((item) => ({
      id_materia: item.id,
      id_producto: producto.id,
      tamanio: size.key,
      cantidad: 1,
      materiaPrima: item,
    }));

    setPreparaciones((current) => current.concat(newPreparaciones));
  };

  const deleteIngrediente = (id) => {
    setPreparaciones((current) =>
      current.filter((item) => item.id !== id && item.tamanio === selectedTab)
    );
  };

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
          <ChipPreparations
            key={key}
            item={{ key, value }}
            isChecked={selectedPreparations.some((size) => size.key === key)}
            isDisabled={
              selectedPreparations.some((size) => size.key === "unico") &&
              key !== "unico"
            }
            onChange={(e) => handleChecked(e, { key, value })}
          />
        ))}
      </ul>
      <TableIngredientesProductos selectedPreparations={selectedPreparations} />
      <Box
        sx={{
          mt: "0.5rem",
        }}
      >
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(event, value) => setSelectedTab(value)}>
              {selectedPreparations.map((item) => (
                <Tab key={item.key} label={item.value} value={item.key} />
              ))}
            </TabList>
          </Box>
          {selectedPreparations.map((size) => (
            <TabPanel value={size.key} key={size.key}>
              {preparaciones
                .filter((it) => it.tamanio === selectedTab)
                .map((it) => (
                  <InputIngrediente
                    key={`${it.id_materia}-${it.tamanio}`}
                    preparacion={it}
                    onDelete={deleteIngrediente}
                  />
                ))}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default PreparacionProductos;
