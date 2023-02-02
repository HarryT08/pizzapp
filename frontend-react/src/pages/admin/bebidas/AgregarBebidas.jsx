import { useState, useEffect, createContext } from "react";
import { Header, PreparacionBebidas, Alerta } from "@/components";
import { Alert, TextField } from "@mui/material";
import { instance } from "@/api/api";

const initialDrink = {
  id: "",
  nombre: "",
  costo: 0,
  selectedPreparations: [],
};

export const SelectedDrinkContext = createContext({
  drink: initialDrink,
  setDrink: () => {},
  ingredientes: [],
  presentaciones: [],
  setPresentaciones: () => {},
});

const preparations = {
  personal350: "Personal 350ml",
  personal400: "Personal 400ml",
  litron: "Litron",
  gaseosa15L: "Gaseosa 1.5L",
  gaseosa3L: "Gaseosa 3L",
  unico: "Única",
};

// Mostrar inputs segun el tamano de la bebida

const AgregarBebidas = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [bebida, setBebida] = useState(initialDrink);
  const [presentaciones, setPresentaciones] = useState([]);

  const [selectedPreparations, setSelectedPreparations] = useState(() =>
    bebida.selectedPreparations.map((item) => ({
      key: item,
      value: preparations[item],
    }))
  );

  const getIngredientes = async () => {
    try {
      const response = await instance.get("/ingredientes");
      return setIngredientes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getBebidas();
    getIngredientes();
  }, []);

  return (
    <div>
      <Header
        title="Agregar bebidas"
        subtitle="Podras agregar las bebidas al inventario"
      />

      <div className="flex justify-between gap-5 my-5">
        <div className="w-full drop-shadow-xl bg-white p-3 rounded-md">
          <h2 className="text-lg font-semibold">Producto</h2>
          <hr />
          <div className="flex flex-col my-5">
            <TextField label="Nombre" variant="outlined" />
          </div>
          <h2 className="text-lg font-semibold">Precios</h2>
          <hr />
          <div className="mt-5 flex flex-wrap gap-x-2 gap-y-4 justify-center items-center">
            {selectedPreparations.length === 0 ? (
              <Alerta alerta="info" descripcion="No se ha seleccionado ninguna presentacion"/>
            ) : (
              Object.entries(selectedPreparations).map(([key, value]) => (
                <div key={key} className="">
                  <TextField
                    label={value.value}
                    variant="outlined"
                    type="number"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-full drop-shadow-xl bg-white p-3 rounded-md">
          <h2 className="text-lg font-semibold">Presentaciones</h2>
          <hr />
          <SelectedDrinkContext.Provider
            value={{
              bebida,
              setBebida,
              ingredientes,
              presentaciones,
              selectedPreparations,
              setSelectedPreparations,
              setPresentaciones,
              preparations,
            }}
          >
            <div className="my-5">
              <PreparacionBebidas />
            </div>
          </SelectedDrinkContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default AgregarBebidas;
