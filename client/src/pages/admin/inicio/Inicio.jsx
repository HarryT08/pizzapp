import { Unstable_Grid2 as Grid } from "@mui/material";
import {
  TotalIngreso,
  TotalOrdenes,
  Ventas,
  UltimosProductos,
} from "@/components";

const Inicio = () => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={6} lg={3}>
        <TotalIngreso sx={{ height: "100%" }} value="$15K" />
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <TotalOrdenes
          difference={12}
          positivesx={{ height: "100%" }}
          value="$24K"
        />
      </Grid>
      <Grid xs={12} lg={8}>
        <Ventas
          chartSeries={[
            {
              name: "Este año",
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
            },
            {
              name: "Año pasado",
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4}>
        <UltimosProductos sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default Inicio;
