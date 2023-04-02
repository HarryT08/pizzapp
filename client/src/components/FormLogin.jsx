import { useContext } from "react";
import { Loader } from "@/components";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "@/context/auth/AuthContext";
import { Button, FormHelperText, TextField, Stack } from "@mui/material";

const FormLogin = () => {
  const { state, login, loading } = useContext(AuthContext);

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  const year = new Date().getFullYear();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="username"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              {...field}
              type="text"
              label="Usuario"
              error={error ? true : false}
              helperText={error?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccdbfd",
                    backgroundColor: "#FFFFFF",
                  },
                  "& input": {
                    zIndex: 1,
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              {...field}
              type="password"
              label="Contraseña"
              error={error ? true : false}
              helperText={error?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccdbfd",
                    backgroundColor: "#FFFFFF",
                  },
                  "& input": {
                    zIndex: 1,
                  },
                },
              }}
            />
          )}
        />
      </Stack>
      <Button
        sx={{ mt: 3 }}
        color="primary"
        fullWidth
        size="large"
        variant="contained"
        type="submit"
      >
        {loading ? <Loader /> : "Iniciar sesion"}
      </Button>
      <FormHelperText sx={{ mt: 1 }}>
        &copy; {year} ARTECH - Derechos totalmente reservados.
      </FormHelperText>
    </form>
  );
};

export default FormLogin;
