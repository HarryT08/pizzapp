import { Stack } from "@mui/material";
import { Header, TabsOrdenes } from "@/components";

const Ordenes = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Header title="Ordenes" subtitle="Visualizar ordenes." />
      </Stack>
      <Stack spacing={0}>
        <TabsOrdenes />
      </Stack>
    </Stack>
  );
};

export default Ordenes;
