import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { Box, Typography, Grid, Chip, Card } from "@mui/material";

const MesasDisponibles = ({ colorEstado, estado, numeroMesa }) => {
  return (
    <Grid item xs={12} md={4}>
      <Link to={`/mesero/tomar-orden/${numeroMesa}`}>
        <Card sx={{ p: 1, border: "1px solid rgba(0,0,0,0.1)" }}>
          {/* Numero de la mesa */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label={estado}
              sx={{
                backgroundColor: `${colorEstado}20`,
                color: colorEstado,
                borderRadius: "9999px",
                fontWeight: "medium",
                px: 2,
                py: 1,
                m: 1,
              }}
            />
          </Box>

          {/* Cuerpo carta */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                border: "2px solid black",
                maxWidth: "max-content",
                p: 7,
                borderRadius: "50%",
              }}
            >
              <GiKnifeFork size={40} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <Typography
              sx={{
                backgroundColor: "rgba(30, 136, 229, 0.2)",
                color: "#1e88e5",
                borderRadius: "9999px",
                fontWeight: "medium",
                px: 2,
                py: 1,
                m: 1,
              }}
            >
              Mesa {numeroMesa}
            </Typography>
          </Box>
        </Card>
      </Link>
    </Grid>
  );
};

export default MesasDisponibles;
