import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination
} from "@mui/material";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

const columnas = [
  { id: "nombre", label: "Nombre" },
  { id: "acciones", label: "Acciones" },
];

const TableProductosMesero = ({ products, carrito, setCarrito }) => {

  const [pageProducts, setPageProducts] = useState(0);
  const [rowsProducts, setRowsProducts] = useState(10);
  const [search, setSearch] = useState("");

  // Paginacion tabla productos
  const handleChangePageProducts = (event, newPage) => {
    setPageProducts(newPage);
};

const handleChangeRowsPerPageProducts = (event) => {
    setRowsProducts(+event.target.value);
    setPageProducts(0);
};

  const findProduct = (id) => {
    const check = carrito.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product.id === id;
      });
      setCarrito([...carrito, { ...data[0], cantidad: 0 }]);
    } else {
      toast.error("El producto ya se encuentra en el carrito");
    }
  };

  const filterProducts = () => {
    return products.filter((val) => {
      if (search === "") {
        return val;
      } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    });
  };

  return (
    <>
      <div className="mb-3">
        <h1 className="font-bold text-base">Productos</h1>
      </div>
      <form className="mb-3">
        <div className="flex">
          <input
            type="text"
            placeholder="Busqueda"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            className="px-2 movilM:px-2.5 py-1 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-azul-marino/20 focus-within:border-azul-marino focus:outline-none"
          />
          <div className="inline-flex">
            <button className="bg-azul-marino text-white border-2 border-azul-marino transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white  hover:text-azul-marino">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </form>
      {products.length === 0 ? (
        <p className="text-center">No hay productos</p>
      ) : (
        <Paper>
          {filterProducts().length === 0 ? (
            <p className="text-center">Este producto no se ha agregado</p>
          ) : (
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
              <Table>
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
                  {filterProducts().map((product) => (
                    <TableRow key={product.id}>
                      <TableCell align="center">{product.nombre}</TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <p
                            className="w-max px-3 py-1 cursor-pointer rounded-full bg-azul-marino/20 font-medium text-azul-marino"
                            onClick={() => findProduct(product.id)}
                          >
                            Agregar
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
                        style={{ width: "100%" }}
                        rowsPerPageOptions={[10, 50, 100, 200]}
                        component="div"
                        count={products.length}
                        rowsPerPage={rowsProducts}
                        page={pageProducts}
                        onPageChange={handleChangePageProducts}
                        onRowsPerPageChange={handleChangeRowsPerPageProducts}
                    />
        </Paper>
      )}
    </>
  );
};

export default TableProductosMesero;
