import {
  Modal,
  Fade,
  TextField,
  MenuItem,
  Button,
  Box,
  Backdrop,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as ingredientesServices from "@/services/ingredientes/ingredientes";
import { IngredienteContext } from "@/context/ingredientes/IngredientesContext";
import { Loader } from "@/components";

const useStyles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isCustom = useMediaQuery(theme.breakpoints.down("custom"))

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmall ? "90vw" : isMedium ? "35vw" : isCustom ? "50vw" : "35vw",
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };
};

const ModalIngrediente = ({
  setModalIngredienteOpen,
  modalIngredienteOpen,
  openEdit,
  onCloseEdit,
  ingredienteSeleccionado,
  ingredienteAnterior,
}) => {
  const style = useStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { pesajes, addIngredient, updateIngrediente } =
    useContext(IngredienteContext);
  const [isLoading, setIsLoading] = useState(false);

  const addIngredientMutation = useMutation({
    mutationFn: ingredientesServices.createIngredient,
    onSuccess: () => {
      toast.success("Ingrediente creado correctamente");
    },
  });

  useEffect(() => {
    if (ingredienteSeleccionado && openEdit) {
      reset({
        nombre: ingredienteSeleccionado.nombre,
        existencia: fromGrams(
          ingredienteSeleccionado.existencia,
          ingredienteSeleccionado.pesaje
        ),
        pesaje: ingredienteSeleccionado.pesaje,
      });
    } else {
      reset();
    }
  }, [ingredienteSeleccionado, openEdit, reset]);

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

  const editIngredients = async (data) => {
    let newData = {};
    if (data.pesaje !== ingredienteAnterior.pesaje) {
      const nuevaExistencia = toGrams(data.existencia, data.pesaje);
      newData = {
        nombre: data.nombre,
        existencia: nuevaExistencia,
        pesaje: data.pesaje,
      };
    } else {
      const existenciaNueva = toGrams(data.existencia, data.pesaje);
      newData = {
        nombre: data.nombre,
        existencia:
          parseInt(existenciaNueva) + parseInt(ingredienteAnterior.existencia),
        pesaje: data.pesaje,
      };
    }
    setIsLoading(true);
    try {
      updateIngrediente({
        ...newData,
        id: ingredienteSeleccionado.id,
      });
      onCloseEdit();
      setIsLoading(false);
      reset();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error al editar el ingrediente");
    }
  };

  const addIngredients = async (data) => {
    try {
      setIsLoading(true);
      const existenciaFormateada = toGrams(data.existencia, data.pesaje);
      const dataToSend = { ...data, existencia: existenciaFormateada };
      const response = await addIngredientMutation.mutateAsync(dataToSend);
      addIngredient(response.data);
      setModalIngredienteOpen(false);
      setIsLoading(false);
      reset();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error al crear el ingrediente");
    }
  };

  const handleCloseModalIngrediente = () => {
    reset();
    setModalIngredienteOpen(false);
  };

  return (
    <Modal
      open={
        modalIngredienteOpen !== undefined || openEdit !== undefined
          ? modalIngredienteOpen || openEdit
          : false
      }
      onClose={openEdit ? onCloseEdit : handleCloseModalIngrediente}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={modalIngredienteOpen || openEdit}>
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            {openEdit ? "Editar ingrediente" : "Crear ingrediente"}
          </Typography>
          <form
            onSubmit={handleSubmit(openEdit ? editIngredients : addIngredients)}
          >
            <TextField
              fullWidth
              type="text"
              error={Boolean(errors.nombre)}
              helperText={
                errors.nombre?.type === "required" && "El nombre es requerido"
              }
              label="Nombre"
              {...register("nombre", {
                required: true,
              })}
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                fullWidth
                type="number"
                label="Existencia"
                error={Boolean(errors.existencia)}
                helperText={
                  errors.existencia?.type === "required" &&
                  "La existencia es requerida"
                }
                {...register("existencia", {
                  required: true,
                })}
              />
              <TextField
                select
                defaultValue={ingredienteSeleccionado?.pesaje || "G"}
                label="Pesaje"
                fullWidth
                {...register("pesaje")}
              >
                {pesajes.map((pesaje) => (
                  <MenuItem key={pesaje.value} value={pesaje.value}>
                    {pesaje.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
              >
                {openEdit ? (
                  isLoading ? (
                    <Loader />
                  ) : (
                    "Editar"
                  )
                ) : isLoading ? (
                  <Loader />
                ) : (
                  "Crear"
                )}
              </Button>
              <Button
                fullWidth
                color="error"
                variant="contained"
                size="medium"
                type="button"
                onClick={openEdit ? onCloseEdit : handleCloseModalIngrediente}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalIngrediente;
