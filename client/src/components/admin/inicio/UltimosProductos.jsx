import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { MdArrowRightAlt } from "react-icons/md";
import { useContext } from "react";
import { ProductContext } from "@/context/productos/ProductContext";

const UltimosProductos = ({ sx }) => {
  const { products } = useContext(ProductContext);

  return (
    <Card sx={sx}>
      <CardHeader title="Ultimos productos" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          return (
            <ListItem divider={hasDivider} key={product.id}>
              <ListItemText
                primary={product.nombre}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <MdArrowRightAlt />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          Ver todas
        </Button>
      </CardActions>
    </Card>
  );
};

export default UltimosProductos;
