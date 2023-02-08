import { useState } from "react";
import { Loader } from "../..";
import { Modal, Fade, TextField, MenuItem } from "@mui/material";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEditIngrediente = ({
  openModalEdit,
  handleCloseModalEdit,
  ingrediente,
  setIngrediente,
  data,
  setData,
  getIngredientes,
  pesajes,
  ingredienteAnterior,
  setIngredienteAnterior,
}) => {
  const [loading, setLoading] = useState(false);

  function fromGrams(value, unit) {
    switch (unit) {
      case "G":
        return Number(value);
      case "Kg":
        return Math.round(Number(value / 1000));
      case "Oz":
        return Math.round(Number(value / 28.3495));
      case "Lb":
        return Math.round(Number(value / 453.592));
      default:
        return "Unidad invalida";
    }
  }

  function toGrams(value, unit) {
    switch (unit) {
      case "G":
        return Number(value);
      case "Kg":
        return Math.round(Number(value * 1000));
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

  const editProduct = async (e) => {
    e.preventDefault();

    let newData = {
      nombre: ingrediente.nombre,
      existencia: ingrediente.existencia,
      pesaje: ingrediente.pesaje,
    };

    if (ingrediente.pesaje !== ingredienteAnterior.pesaje) {
      const existenciaAnterior = ingredienteAnterior.existencia;
      const pesajeAnterior = ingredienteAnterior.pesaje;
      const existenciaAnteriorUnitaria = fromGrams(
        existenciaAnterior,
        pesajeAnterior
      );

      const nuevaExistencia = toGrams(
        existenciaAnteriorUnitaria,
        ingrediente.pesaje
      );
      newData = {
        nombre: ingrediente.nombre,
        existencia: nuevaExistencia,
        pesaje: ingrediente.pesaje,
      };
    }

    if (ingrediente.pesaje === ingredienteAnterior.pesaje) {
      newData = {
        nombre: ingrediente.nombre,
        existencia:
          parseInt(ingrediente.existencia) +
          parseInt(ingredienteAnterior.existencia),
        pesaje: ingrediente.pesaje,
      };
    }

    setLoading(true);
    try {
      await instance.put(`/ingredientes/${ingrediente.id}`, newData);
      setIngrediente({
        id: "",
        nombre: "",
        existencia: "",
        pesaje: "",
      });
      setIngredienteAnterior({
        pesaje: "",
        existencia: "",
      });
      handleCloseModalEdit();
      toast.success("Ingrediente actualizado correctamente");
      getIngredientes();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModalEdit}
      onClose={handleCloseModalEdit}
      closeAfterTransition
    >
      <Fade in={openModalEdit}>
        <div className="modal">
          <div className="header-modal">
            <h3 className="text-xl font-semibold">Editar ingrediente</h3>
          </div>
          <form onSubmit={editProduct}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              type="text"
              defaultValue={ingrediente.nombre}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
            <div className="flex gap-2">
              <TextField
                type="number"
                name="existencia"
                label="Existencia"
                defaultValue={
                  ingrediente.existencia !== ""
                    ? fromGrams(ingrediente.existencia, ingrediente.pesaje)
                    : ""
                }
                onChange={handleChange}
              />
              <TextField
                select
                label="Pesaje"
                name="pesaje"
                value={ingrediente.pesaje}
                onChange={handleChange}
              >
                {pesajes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex pt-3 gap-3">
              <button
                type="submit"
                className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-azul-marino/20 bg-azul-marino/20 text-azul-marino font-bold transition duration-300 ease-in-out hover:bg-azul-marino hover:text-white"
              >
                {loading ? <Loader /> : "Editar ingrediente"}
              </button>
              <button
                type="button"
                className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white"
                onClick={handleCloseModalEdit}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalEditIngrediente;
