import { useState, useEffect } from "react";
import { bohemiaApi } from "@/api/bohemiaApi";
import {
  Button,
  Stack,
  SvgIcon,
  useMediaQuery,
  Box,
  Grid,
} from "@mui/material";
import { Header, Alerta, Mesa, ModalMesas } from "@/components";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";

const Mesas = () => {
  const [open, setModalMesaOpen] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(false);

  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  const handleOpenModalMesa = () => {
    setModalMesaOpen(true);
  };

  const getMesas = async () => {
    try {
      setLoading(true);
      const response = await bohemiaApi.get("/mesas");
      setMesas(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error al obtener las mesas");
      console.error(error);
    }
  };

  const deleteMesa = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        bohemiaApi
          .delete(`/mesas/${id}`)
          .then((res) => {
            toast.success("Mesa eliminada correctamente");
            getMesas();
          })
          .catch((err) => {
            toast.error("Error al eliminar la mesa");
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    getMesas();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Stack
          marginBottom={3}
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={1}>
            <Header
              title="Mesas"
              subtitle="Administracion de las mesas del restaurante."
            />
          </Stack>
          <div>
            <Button
              onClick={() => handleOpenModalMesa()}
              sx={{
                fontSize: smUp ? "1rem" : "0.75rem",
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <MdAdd />
                </SvgIcon>
              }
              variant="contained"
            >
              Agregar
            </Button>
          </div>
        </Stack>
        <Box
          sx={{
            mt: 3,
          }}
        >
          {loading ? (
            <div className="loader"></div>
          ) : mesas.length === 0 ? (
            <Alerta alerta="info" descripcion="No hay mesas registradas" />
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {mesas.map((mesa) => {
                const colorEstado =
                  mesa.estado === "Disponible" ? "#008000" : "#e63946";
                return (
                  <Mesa
                    key={mesa.id}
                    colorEstado={colorEstado}
                    estado={mesa.estado}
                    numeroMesa={mesa.id}
                    deleteMesa={deleteMesa}
                  />
                );
              })}
            </Grid>
          )}
        </Box>
      </Stack>
      <ModalMesas
        setModalMesaOpen={setModalMesaOpen}
        modalMesaOpen={open}
        getMesas={getMesas}
      />
    </>
  );
};

export default Mesas;
