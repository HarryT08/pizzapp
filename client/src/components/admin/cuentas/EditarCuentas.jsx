import { useContext, useEffect } from "react";
import { CuentaContext } from "@/context/cuentas/CuentasContext";
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
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Loader } from "@/components";

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

const EditarCuentas = ({ setModalEditOpen, modalEditOpen }) => {
  const { handleEditUser, loading, selectPerson } = useContext(CuentaContext);
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const style = useStyles();

  const editUser = (data) => {
    handleEditUser(data);
    console.log("Data modal editar->", data);
    reset();
    setModalEditOpen(false);
  };

  useEffect(() => reset(), [reset, selectPerson]);

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };
  return (
    <Modal
      open={modalEditOpen}
      onClose={handleCloseEditModal}
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
      <Fade in={modalEditOpen}>
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Editar Usuario
          </Typography>
          <form onSubmit={handleSubmit(editUser)}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Controller
                  name="cedula"
                  control={control}
                  defaultValue={selectPerson?.persona.cedula}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Cedula"
                      type="number"
                      disabled={true}
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue={selectPerson?.persona.nombre}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      type="text"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="apellido"
                  control={control}
                  defaultValue={selectPerson?.persona.apellido}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Apellido"
                      type="text"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="celular"
                  control={control}
                  defaultValue={selectPerson?.persona.celular}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Celular"
                      type="number"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Contraseña"
                      type="password"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue={selectPerson?.username}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Usuario"
                      type="text"
                      error={error?.message}
                      helperText={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="idRol"
                  control={control}
                  defaultValue={selectPerson?.idRol}
                  render={({ field }) => (
                    <TextField select label="Cargo" {...field}>
                      <MenuItem value="1">Mesero</MenuItem>
                      <MenuItem value="2">Administrador</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
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
                onClick={handleCloseEditModal}
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

export default EditarCuentas;
