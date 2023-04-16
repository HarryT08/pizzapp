import { useState, useContext } from "react";
import { Header, TableProductosMesero, DrawerCarrito } from "@/components";
import { useParams, Link } from "react-router-dom";
import {
  IconButton,
  Tooltip,
  Stack,
  SvgIcon,
  OutlinedInput,
  Card,
  InputAdornment,
  Badge,
  Button,
} from "@mui/material";
import { ProductContext } from "@/context/productos/ProductContext";
import { TomarOrdenContext } from "@/context/mesero/tomarOrden/TomarOrdenContext";
import {
  MdOutlineSearch,
  MdShoppingCart,
  MdKeyboardBackspace,
} from "react-icons/md";

const TomarOrden = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { products } = useContext(ProductContext);
  const { carrito } = useContext(TomarOrdenContext);
  const { id } = useParams();

  const searchProductos = () => {
    return products.filter((product) => {
      return (
        search === "" ||
        product.nombre.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack spacing={1}>
          <Link to="/mesero/realizar-pedido">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<MdKeyboardBackspace />}
            >
              Volver
            </Button>
          </Link>
          <Header
            title={`Tomar orden la mesa #${id}`}
            subtitle="Agregar los productos al que desean ordenar"
          />
        </Stack>
        <div>
          <Tooltip title="Carrito productos" arrow>
            <IconButton onClick={() => handleOpen()}>
              <Badge badgeContent={carrito.length} color="primary">
                <MdShoppingCart color="#000" />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </Stack>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          defaultValue={search}
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto por nombre"
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
      <TableProductosMesero searchProductos={searchProductos} />
      <DrawerCarrito setOpen={setOpen} open={open} />
    </Stack>
  );
};

export default TomarOrden;
