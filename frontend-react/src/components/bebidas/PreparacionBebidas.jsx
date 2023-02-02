import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useContext } from "react";
import { TableIngredientesBebidas, Alerta } from "@/components";
import { SelectedDrinkContext } from "@/pages/admin/bebidas/AgregarBebidas";
import ChipPreparacion from "../productos/ChipPreparacion";
import InputIngrediente from "../productos/InputIngrediente";

const PreparacionBebidas = () => {
  const {
    bebida,
    presentaciones,
    setPresentaciones,
    selectedPreparations,
    setSelectedPreparations,
    preparations,
  } = useContext(SelectedDrinkContext);

  const [selectedTab, setSelectedTab] = useState(
    () => bebida.selectedPreparations.at(-1) || ""
  );

  const handleChangeChecked = (e, presentation) => {
    if (!e.target.checked) {
      const nextPresentation = selectedPreparations.filter(
        (a) => a.key !== presentation.key
      );

      setSelectedTab(nextPresentation.at(-1)?.key || "");
      setSelectedPreparations(nextPresentation);
      setPresentaciones((draft) =>
        draft.filter((it) => it.tamanio !== presentation.key)
      );
      return;
    }

    if (presentation.key === "unico") {
      setSelectedTab("unico");
      setSelectedPreparations([presentation]);
      setPresentaciones((draft) =>
        draft.filter((it) => it.tamanio === "unico")
      );
      return;
    }

    setSelectedTab(presentation.key);
    setSelectedPreparations((current) => [...current, presentation]);

    const record = {};

    presentaciones.forEach(
      (item) => (record[item.id_materia] = item.materiaPrima)
    );

    const newPreparaciones = Object.values(record).map((item) => ({
      id_materia: item.id,
      id_producto: bebida.id,
      tamanio: presentation.key,
      cantidad: 1,
      materiaPrima: item,
    }));

    setPresentaciones((current) => current.concat(newPreparaciones));
  };

  const deleteIngrediente = (id) => {
    setPresentaciones((current) =>
      current.filter((item) => item.id !== id && item.tamanio === selectedTab)
    );
  };

  return (
    <div>
      <ul className="ks-cboxtags flex flex-wrap justify-center gap-1">
        {preparations.length === 0 ? (
          <Alerta alerta="error" descripcion="No se han podido cargar las presentaciones"/>
        ) : (
          Object.entries(preparations).map(([key, value]) => (
            <ChipPreparacion
              key={key}
              item={{ key, value }}
              isChecked={selectedPreparations.some((size) => size.key === key)}
              isDisabled={
                selectedPreparations.some((size) => size.key === "unico") &&
                key !== "unico"
              }
              onChange={(e) => handleChangeChecked(e, { key, value })}
            />
          ))
        )}
      </ul>

      <TableIngredientesBebidas selectedPreparations={selectedPreparations} />

      <div className="mt-2">
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(event, value) => setSelectedTab(value)}>
              {selectedPreparations.map((item) => (
                <Tab
                  key={item.key}
                  label={item.value}
                  value={item.key}
                  sx={{
                    textTransform: "none",
                    fontFamily: ["Montserrat"],
                  }}
                />
              ))}
            </TabList>
          </Box>

          {selectedPreparations.map((size) => (
            <TabPanel value={size.key} key={size.key}>
              {presentaciones
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
      </div>
    </div>
  );
};

export default PreparacionBebidas;
