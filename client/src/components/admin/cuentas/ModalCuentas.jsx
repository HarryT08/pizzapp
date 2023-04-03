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

const ModalCuentas = ({ modalCuentaOpen, setModalCuentaOpen }) => {
  const { handleCreateUser, handleGetPerson, loading, person, setPerson } =
    useContext(CuentaContext);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const style = useStyles();

  const sendUser = (data) => {
    handleCreateUser(data);
    reset();
    setModalCuentaOpen(false);
  };

  useEffect(() => {
    if (modalCuentaOpen && person) {
      setValue("nombre", person.nombre);
      setValue("apellido", person.apellido);
      setValue("celular", person.celular);
    }
  }, [person, setValue]);

  const handleCloseModal = () => {
    reset();
    setPerson({
      nombre: "",
      apellido: "",
      celular: "",
    });
    setModalCuentaOpen(false);
  };

  const handleCedulaBlur = async () => {
    return await handleGetPerson(watch("cedula"));
  };

  return (
    <Modal
      open={modalCuentaOpen}
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
      <Fade in={modalCuentaOpen}>
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Agregar Usuario
          </Typography>
          <form onSubmit={handleSubmit(sendUser)}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Controller
                  name="cedula"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Este campo es requerido",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label="Cedula"
                      type="number"
                      error={!!errors.cedula}
                      helperText={errors.cedula && errors.cedula.message}
                      value={value}
                      onChange={(e) => onChange(parseInt(e.target.value))}
                      onBlur={handleCedulaBlur}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue={person.nombre || ""}
                  rules={{
                    required: "Este campo es requerido",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      type="text"
                      error={error ? true : false}
                      disabled={person.nombre ? true : false}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="apellido"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label="Apellido"
                      type="text"
                      error={!!errors.apellido}
                      disabled={person.apellido ? true : false}
                      helperText={errors.apellido && errors.apellido.message}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="celular"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label="Telefono"
                      type="number"
                      error={!!errors.celular}
                      helperText={errors.celular && errors.celular.message}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label="Contraseña"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password && errors.password.message}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label="Usuario"
                      type="text"
                      error={!!errors.username}
                      helperText={errors.username && errors.username.message}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="idRol"
                  control={control}
                  defaultValue="1"
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

export default ModalCuentas;
