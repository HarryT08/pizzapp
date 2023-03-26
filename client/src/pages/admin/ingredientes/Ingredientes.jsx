import { useContext, useState } from "react";
import { IngredienteContext } from "@/context/ingredientes/IngredientesContext";
import {
  Button,
  Stack,
  SvgIcon,
  OutlinedInput,
  Card,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { MdArrowCircleUp, MdAdd, MdOutlineSearch } from "react-icons/md";
import { TableIngredientes, ModalIngrediente, Header } from "@/components";

const Ingredientes = () => {
  const [search, setSearch] = useState("");
  const [modalIngredienteOpen, setModalIngredienteOpen] = useState(false);
  const { ingredientes } = useContext(IngredienteContext);

  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  const searchIngredients = () => {
    return ingredientes.filter((ingrediente) => {
      return (
        search === "" ||
        ingrediente.nombre.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const handleOpenModalIngrediente = () => {
    setModalIngredienteOpen(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Stack spacing={1}>
            <Header title="Ingredientes" subtitle="Administrar ingredientes." />
            <Stack alignItems="center" direction="row" spacing={1}>
              <Button
                color="inherit"
                startIcon={
                  <SvgIcon fontSize="small">
                    <MdArrowCircleUp />
                  </SvgIcon>
                }
              >
                Importar
              </Button>
            </Stack>
          </Stack>
          <div>
            <Button
              sx={{
                fontSize: smUp ? "1rem" : "0.75rem",
              }}
              onClick={handleOpenModalIngrediente}
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
        <Card sx={{ p: 2 }}>
          <OutlinedInput
            defaultValue={search}
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ingrediente por nombre"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MdOutlineSearch />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500 }}
          />
        </Card>
        <TableIngredientes searchIngredients={searchIngredients} />
      </Stack>
      <ModalIngrediente
        modalIngredienteOpen={modalIngredienteOpen}
        setModalIngredienteOpen={setModalIngredienteOpen}
      />
    </>
  );
};

export default Ingredientes;
