import { Alert } from "@mui/material";

const Alerta = ({descripcion, alerta}) => {
  return (
    <Alert severity={alerta}>
      <strong>{descripcion}</strong>
    </Alert>
  );
};

export default Alerta;