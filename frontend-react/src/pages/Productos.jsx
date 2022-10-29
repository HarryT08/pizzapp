import { useStateContext } from "../context/ContextProvider";
import { FiSearch } from "react-icons/fi";
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
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { useState } from "react";
import FileUpload from "../components/FileUpload";

const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "acciones", label: "Acciones" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Productos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [value, setValue] = useState("1");
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleDelete, data } = useStateContext();
  const [search, setSearch] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const filterData = () => {
    return data.filter((val) => {
      if (search === "") {
        return val;
      } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    });
  };

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };

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
              <p className="font-semibold text-lg">Sube una imagen</p>
              <FileUpload />
              <div className="flex flex-col mt-3">
                <label className="font-semibold text-lg">Nombre</label>
                <input
                  type="text"
                  className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label className="font-semibold text-lg">Precio</label>
                <input
                  type="number"
                  className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                />
              </div>
              <div className="flex pt-3 gap-3">
                <button type="submit" className="btn">
                  {loading ? <Loader /> : "Agregar ingrediente"}
                </button>
                <button
                  className="btnCancel"
                  onClick={() => abrirCerrarModalAgregar()}
                >
                  Cancelar
                </button>
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
                    <input type="checkbox" />
                    Pequeña
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" />
                    Mediana
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" />
                    Grande
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input type="checkbox" />
                    Unico
                  </label>
                </div>
              </div>
              {/* DataTable */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }}>
                  <TableHead style={{ background: "#D00000" }}>
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
                  </TableHead>
                  <TableBody>
                    {data
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
                            <button className="btn">Agregar</button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[3,9, 30, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </form>
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
        <button className="btn" onClick={() => abrirCerrarModalAgregar()}>
          Agregar ingrediente
        </button>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {filterData().length === 0
            ? "No se encontraron productos"
            : filterData().map((item) => (
                <div key={item.id} className="card-producto">
                  <div className="container-img">
                    <img
                      src={item.img}
                      alt="Foto producto"
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <hr className="border-2 border-rojo-fuerte" />
                  </div>
                  <div className="card-body">
                    <h1 className="text-xl font-extrabold text-center">
                      {item.nombre}
                    </h1>
                    <p className="mt-1 text-center px-2 py-1 bg-verde-profundo w-max text-white font-semibold text-lg rounded-lg">
                      {item.precio}
                    </p>
                  </div>
                  <div className="card-buttons flex justify-center gap-5 py-3">
                    <button className="editar">Editar</button>
                    <button
                      className="eliminar"
                      onClick={() => showAlert(item.id)}
                    >
                      {" "}
                      Eliminar{" "}
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyModalAgregar}
      </Modal>
    </div>
  );
};

export default Productos;
