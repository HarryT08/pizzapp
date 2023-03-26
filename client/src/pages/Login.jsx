import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { FormLogin } from "@/components";
import imageLogin from "@/assets/images/bgFormLogin.png";
import image from "@/assets/images/bgLoginGrande.png";

const Login = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
    defaultMatches: true,
    noSsr: false,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${imageLogin})`,
            width: !mdUp ? "100%" : "50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: "100px",
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">Inicio de sesion</Typography>
                <Typography color="text.secondary" variant="body2">
                  Bienvenido a PizzaBohemia. Por favor inicie sesion para
                  continuar.
                </Typography>
              </Stack>
              <FormLogin />
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: !mdUp ? "none" : "block",
            width: !mdUp ? "0%" : "50%",
            height: "100vh",
          }}
        />
      </Box>
    </>
  );
};

export default Login;
