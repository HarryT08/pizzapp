import { useStateContext } from "../context/ContextProvider";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import {
  Modal,
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { useState } from "react";
import { instance } from "../api/api";
import { BtnAgg, BtnDelete } from "../styles/Button";
import { AiTwotoneDelete, AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import { height } from "@mui/system";

// Columnas de la tabla del modal
const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "acciones", label: "Acciones" },
];

// Columnas de los productos
const columnsProductos = [
  { id: "imagen", label: "Imagen" },
  { id: "nombre", label: "Nombre" },
  { id: "precio", label: "Precio" },
  { id: "acciones", label: "Acciones" },
];

// Estilos del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 490,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Productos = () => {
  const [pageProducts, setPageProducts] = useState(0);
  const [rowsProducts, setRowsProducts] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [pequeña, setPequeña] = useState(false);
  const [mediana, setMediana] = useState(false);
  const [grande, setGrande] = useState(false);
  const [unico, setUnico] = useState(false);
  const [ingredientes, setIngredientes] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [value, setValue] = useState("1");
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleDelete, data } = useStateContext();
  const [search, setSearch] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Obtener todos los productos
  const getProducts = async () => {
    try {
      const response = await instance.get("/ingredientes");
      return setIngredientes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Funciones parar abrir y cerrar los dropdowns
  const checkPequeña = () => {
    setPequeña(!pequeña);
  };

  const checkMediana = () => {
    setMediana(!mediana);
  };

  const checkGrande = () => {
    setGrande(!grande);
  };

  const checkUnico = () => {
    setUnico(!unico);
  };

  // Agregamos un producto al carrito
  const findProduct = (id) => {
    const check = carrito.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = ingredientes.filter((ingrediente) => {
        return ingrediente.id === id;
      });
      setCarrito([...carrito, ...data]);
    } else {
      toast.error("El producto ya ha sido agregado.");
    }
  };

  // Paginacion de la tabla del modal
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Paginacion tabla productos
  const handleChangePageProducts = (event, newPage) => {
    setPageProducts(newPage);
  }

  const handleChangeRowsPerPageProducts = (event) => {
    setRowsProducts(+event.target.value);
    setPageProducts(0);
  }

  // Funcion para eliminar productos
  const showAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
      }
    });
  };

  // Funcion para filtrar los productos
  const filterData = () => {
    return data.filter((val) => {
      if (search === "") {
        return val;
      } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    });
  };

  // Funcion para abrir y cerrar el modal agg
  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };

  // Funcion para eliminar el producto agg al carrito
  const deleteProduct = (id) => {
    const newProducts = carrito.filter((item) => {
      return item.id !== id;
    });
    setCarrito(newProducts);
  }

  const bodyModalAgregar = (
    <Box sx={style}>
      <Box style={{ fontFamily: "Montserrat" }} sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab value="1" label="Agregar Producto" />
              <Tab value="2" label="Agregar Ingredientes" />
            </TabList>
          </Box>
          {/* Agg producto */}
          <TabPanel value="1">
            <form>
              <TextField fullWidth label='Nombre' type='text' sx={{mb:3}}/>
              <TextField fullWidth label='Precio' type='number'/>
              <div className="flex pt-3 gap-3">
                <BtnAgg type="submit">
                  {loading ? <Loader /> : "Agregar"}
                </BtnAgg>
                <BtnDelete
                  onClick={() => abrirCerrarModalAgregar()}
                >
                  Cancelar
                </BtnDelete>
              </div>
            </form>
          </TabPanel>
          {/* Agg ingrediente */}
          <TabPanel value="2">
            <form>
              {/* Selects */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" onClick={() => checkPequeña()} />
                    Pequeña
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" onClick={() => checkMediana()} />
                    Mediana
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" onClick={() => checkGrande()} />
                    Grande
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" onClick={() => checkUnico()} />
                    Unico
                  </label>
                </div>
              </div>
              {/* DataTable */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }}>
                  <TableHead style={{ background: "#D00000" }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontFamily: "Montserrat",
                          }}
                          align="center"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ingredientes
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell
                            style={{ fontFamily: "Montserrat" }}
                            align="center"
                          >
                            {item.nombre}
                          </TableCell>
                          <TableCell
                            style={{ fontFamily: "Montserrat" }}
                            align="center"
                          >
                            <p className="cursor-pointer border border-azul-marino rounded-full bg-azul-marino/20 font-medium text-azul-marino" onClick={() => findProduct(item.id)}>Agregar</p>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                style={{ width: "100%" }}
                rowsPerPageOptions={[3, 9, 30, 100]}
                component="div"
                count={ingredientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </form>
            <div className="mt-2">
              {pequeña && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Pequeña</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carrito.map((item) => (
                      <div className="flex mb-1 gap-2" key={item.id}>
                        <p>{item.nombre}</p>
                        <input type="text" className='px-1 border-2 rounded-lg border-azul-marino/60 focus-within:border-azul-marino  focus:outline-none'/>
                        <div className="flex items-center">
                          <AiFillCloseCircle onClick={() => deleteProduct(item.id)} className="text-rojo-fuerte/50 hover:text-rojo-fuerte cursor-pointer"/>
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
              {mediana && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Mediana</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carrito.map((item) => (
                      <div className="flex" key={item.id}>
                        <p>{item.nombre}</p>
                        <p>{item.existencia}</p>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
              {grande && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Grande</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carrito.map((item) => (
                      <div className="flex" key={item.id}>
                        <p>{item.nombre}</p>
                        <p>{item.existencia}</p>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
              {unico && (
                <Accordion>
                  <AccordionSummary
                    style={{
                      background: "#D00000",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    expandIcon={<IoIosArrowDown color="white" />}
                  >
                    <p className="font-semibold text-white">Unico</p>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    {carrito.map((item) => (
                      <div className="flex" key={item.id}>
                        <p>{item.nombre}</p>
                        <p>{item.existencia}</p>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );

  return (
    <div className="w-full p-3">
      {/* Barra busqueda */}
      <div className="flex justify-between py-3 border-b-2">
        <form action="">
          <div className="relative flex items-center text-gray-400 focus-within:text-azul-marino border-2 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-3 py-2 placeholder-gray-500 text-black rounded-lg border-none focus:outline-none"
            />
            <FiSearch className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-8">
        <BtnAgg className="btn" onClick={() => abrirCerrarModalAgregar()}>
          Agregar ingrediente
        </BtnAgg>
      </div>

      {/* DataTable Productos */}
      <div className="mt-8">
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow style={{ background: "#D00000" }}>
                  {columnsProductos.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData().length === 0
                  ? "No hay Productos"
                  : filterData()
                      .slice(
                        pageProducts * rowsProducts,
                        pageProducts * rowsProducts + rowsProducts
                      )
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">
                            <div className="flex justify-center">
                              <img
                                src={item.img}
                                alt="Imagen"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="center">{item.nombre}</TableCell>
                          <TableCell align="center">{item.precio}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-5 justify-center">
                              <AiFillEdit
                                size={25}
                                className="bg-naranja-vivido rounded-full p-1 text-white cursor-pointer"
                              />
                              <AiTwotoneDelete
                                size={25}
                                className="bg-rojo-fuerte rounded-full p-1 text-white cursor-pointer"
                                onClick={() => showAlert(item.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ width: "100%" }}
            rowsPerPageOptions={[10, 50, 100, 200]}
            component="div"
            count={data.length}
            rowsPerPage={rowsProducts}
            page={pageProducts}
            onPageChange={handleChangePageProducts}
            onRowsPerPageChange={handleChangeRowsPerPageProducts}
          />
        </Paper>
      </div>
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyModalAgregar}
      </Modal>
    </div>
  );
};

export default Productos;
