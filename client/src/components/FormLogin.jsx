import { useState } from "react";
import { Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as loginServices from "@/services/login/login";
import { Button, FormHelperText, TextField, Stack } from "@mui/material";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginServices.loginUser,
    onSuccess: () => {
      toast.success("Bienvenido!!!");
    },
  });

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginMutation.mutateAsync(data);
      localStorage.setItem("Authorization", response.data.token);
      const decoded = jwtDecode(response.data.token);
      localStorage.setItem("cargo", decoded.cargo);
      if (decoded.cargo === "admin") navigate("/admin");
      else if (decoded.cargo === "mesero") navigate("/mesero");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error al iniciar sesion");
    }
  };

  const year = new Date().getFullYear();

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          type="text"
          label="Usuario"
          error={Boolean(errors.username)}
          helperText={
            errors.username?.type === "required" && "El usuario es requerido"
          }
          {...register("username", {
            required: true,
          })}
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
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          error={Boolean(errors.password)}
          helperText={
            errors.password?.type === "required" && "La contraseña es requerida"
          }
          {...register("password", {
            required: true,
          })}
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
      </Stack>
      <Button
        sx={{ mt: 3 }}
        color="primary"
        fullWidth
        size="large"
        variant="contained"
        type="submit"
      >
        {isLoading ? <Loader /> : "Iniciar sesion"}
      </Button>
      <FormHelperText sx={{ mt: 1 }}>
        &copy; {year} ARTECH - Derechos totalmente reservados.
      </FormHelperText>
    </form>
  );
};

export default FormLogin;
