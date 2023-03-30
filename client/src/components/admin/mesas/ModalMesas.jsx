import { bohemiaApi } from "@/api/bohemiaApi";
import {
  Modal,
  Fade,
  TextField,
  Button,
  Box,
  Backdrop,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Loader } from "@/components";
import { toast } from "react-toastify";

const useStyles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isCustom = useMediaQuery(theme.breakpoints.down("custom"));

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

const ModalMesas = ({ setModalMesaOpen, modalMesaOpen, getMesas }) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const style = useStyles();

  const handleCloseModal = () => {
    reset();
    setModalMesaOpen(false);
  };

  const sendMesa = async (data) => {
    try {
      setLoading(true);
      await bohemiaApi.post("/mesas", data);
      toast.success("Mesa agregada correctamente");
      getMesas();
      handleCloseModal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404) {
        toast.error("Ya existe una mesa con ese numero");
      } else if (error.response.status === 500) {
        toast.error("No se pudo agregar la mesa");
      }
      console.error(error);
    }
  };

  return (
    <Modal
      open={modalMesaOpen}
      onClose={handleCloseModal}
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
      <Fade in={modalMesaOpen}>
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Agregar Mesa
          </Typography>
          <form onSubmit={handleSubmit(sendMesa)}>
            <Controller
              name="id"
              control={control}
              rules={{ required: "Campo requerido" }}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Numero mesa"
                  type="number"
                  helperText={error?.message}
                  error={error ? true : false}
                />
              )}
            />
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
              >
                {loading ? <Loader /> : "Agregar"}
              </Button>
              <Button
                fullWidth
                color="error"
                variant="contained"
                size="medium"
                type="button"
                onClick={handleCloseModal}
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

export default ModalMesas;
