import { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { Loader } from "../..";
import { Modal, Fade } from "@mui/material";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import { AddedButton, CancelButton } from "@/components/mui/Buttons";
import "react-toastify/dist/ReactToastify.css";

const ModalAggIngrediente = ({
  modalOpen,
  handleCloseModal,
  setModalOpen,
  data,
  setData,
  pesajes,
}) => {
  const [loading, setLoading] = useState(false);
  const [ingrediente, setIngrediente] = useState({
    id: "",
    nombre: "",
    existencia: "",
    pesaje: "G",
  });

  function toGrams(value, unit) {
    switch (unit) {
      case "G":
        return Number(value);
      case "Kg":
        return Number(value * 1000);
      case "Oz":
        return Number(value * 28.3495).toFixed(0);
      case "Lb":
        return Number(value * 453.592).toFixed(0);
      default:
        return "Unidad invalida";
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setIngrediente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Peticion POST
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const existenciaFormateada = toGrams(
        ingrediente.existencia,
        ingrediente.pesaje
      );
      const dataToSend = { ...ingrediente, existencia: existenciaFormateada };
      const response = await instance.post("/ingredientes", dataToSend);
      const newData = [
        ...data,
        {
          id: response.data.id,
          nombre: response.data.nombre,
          existencia: existenciaFormateada,
          pesaje: response.data.pesaje,
        },
      ];
      setData([...newData]);
      setLoading(false);
      handleReset();
      toast.success("Ingrediente agregado correctamente");
    } catch (err) {
      setLoading(false);
      toast.error("Error al agregar ingrediente");
    }
  };

  const handleReset = () => {
    document.getElementById("formIngre").reset();
    setIngrediente({
      pesaje: "G",
    });
    setModalOpen(false);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <div className="modal">
            <div className="header-modal">
              <h3 className="text-xl font-semibold">Agregar ingrediente</h3>
            </div>
            <form id="formIngre" onSubmit={addProduct}>
              <TextField
                fullWidth
                required
                type="text"
                name="nombre"
                onChange={handleChange}
                label="Nombre"
                sx={{ marginBottom: "10px" }}
              />
              <div className="flex gap-2">
                <TextField
                  required
                  type="number"
                  name="existencia"
                  onChange={handleChange}
                  label="Existencia"
                />
                <TextField
                  select
                  label="Pesos"
                  value={ingrediente.pesaje}
                  required
                  onChange={handleChange}
                  name="pesaje"
                >
                  {pesajes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex mt-3 gap-3">
                <AddedButton type="submit">
                  {loading ? <Loader /> : "Agregar ingrediente"}
                </AddedButton>
                <CancelButton type="button" onClick={handleReset}>
                  Cancelar
                </CancelButton>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalAggIngrediente;
