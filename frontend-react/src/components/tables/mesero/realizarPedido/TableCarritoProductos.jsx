import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";

const columnas = [
  { id: "nombre", label: "Nombre" },
  { id: "cantidad", label: "Cantidad" },
  { id: "acciones", label: "Acciones" },
];

const TableCarritoProductos = ({ carrito, setCarrito }) => {

  const [observacion, setOberservacion] = useState("")

  // Aumentar cantidades del carrito
  const increaseAmount = (id) => {
    carrito.forEach((item) => {
      if (item.id === id) {
        item.cantidad += 1;
      }
    });
    setCarrito([...carrito]);
  };

  // Disminuir cantidades del carrito y eliminar del carrito
  const decreaseAmount = (id) => {
    carrito.forEach((item) => {
      if (item.id === id) {
        if (item.cantidad >= 1) {
          item.cantidad -= 1;
        } else if (item.cantidad === 0) {
          const check = window.confirm(
            "¿Desea eliminar el producto del carrito?"
          );
          if (check) {
            carrito = carrito.filter((item) => {
              return item.id !== id;
            });
          }
        }
      }
    });
    setCarrito([...carrito]);
  };

  return (
    <>
      <div className="flex items-center gap-10 mb-3 overflow-x-auto">
        <h1 className="font-bold text-base">Carrito de productos</h1>
        <div className="flex gap-5">
          <Link to={'/mesero/confirmar-pedido'} className="rounded-md py-2 px-8 text-xs bg-[#008000]/20 text-[#008000] font-bold transition duration-300 ease-in-out hover:bg-[#008000] hover:text-white cursor-pointer">
            Siguiente
          </Link>
          <Link to={'/mesero/realizar-pedido'} className="rounded-md py-2 px-8 text-xs bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white">
            Volver
          </Link>
        </div>
      </div>
      <Paper sx={{ mb: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow style={{ background: "#D00000" }}>
                {columnas.map((columna) => (
                  <TableCell
                    key={columna.id}
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                    }}
                    align="center"
                  >
                    {columna.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {carrito.map((product) => (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.nombre}</TableCell>
                  <TableCell align="center">{product.cantidad}</TableCell>
                  <TableCell align="center">
                    <div className="flex gap-5 justify-center">
                      <span
                        className="rounded-full p-1 px-2.5 text-sm border-2 border-[#008000]/20 bg-[#008000]/20 text-[#008000] font-bold transition duration-300 ease-in-out hover:bg-[#008000] hover:text-white cursor-pointer"
                        onClick={() => increaseAmount(product.id)}
                      >
                        +
                      </span>
                      <span
                        className="rounded-full p-1 px-2.5 text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white cursor-pointer"
                        onClick={() => decreaseAmount(product.id)}
                      >
                        -
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <h1 className="font-bold text-base">Observaciones del pedido</h1>
        <div>
          <textarea
            className="w-full text-black rounded-lg border-2 border-azul-marino/20 focus-within:border-azul-marino focus:outline-none"
            name=""
            id=""
            cols="20"
            rows="5"
            onChange={(e) => setOberservacion(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default TableCarritoProductos;
