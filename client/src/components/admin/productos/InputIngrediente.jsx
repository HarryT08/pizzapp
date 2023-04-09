import { useState, useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { TextField, Box, Button, IconButton } from "@mui/material";
import { SelectedProductContext } from "@/context/productos/ProductContext";

const InputIngrediente = ({ preparacion, onDelete }) => {
  const { setPreparaciones } = useContext(SelectedProductContext);
  const [cantidad, setCantidad] = useState(preparacion.cantidad || 1);

  const handleChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleBlur = (e) => {
    let value = Number(e.target.value.replace(/[^0-9]+/g, ""));

    if (value < 1 || isNaN(value)) {
      value = 1;
    }

    setCantidad(value);

    setPreparaciones((draft) => {
      return draft.map((it) => {
        if (
          it.id_materia === preparacion.id_materia &&
          it.tamanio === preparacion.tamanio
        ) {
          it.cantidad = value;
        }

        return it;
      });
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: "0.625rem",
        gap: "1.25rem",
        overflowX: "auto",
      }}
    >
      <p>{preparacion.materiaPrima.nombre}</p>
      <TextField
        variant="outlined"
        required
        value={cantidad}
        onChange={handleChange}
        onBlur={handleBlur}
        name="cantidad"
        type="number"
      />
      <small>Gramos</small>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="error"
          type="button"
          onClick={() => onDelete(preparacion.id_materia)}
        >
          <IoIosClose />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InputIngrediente;
