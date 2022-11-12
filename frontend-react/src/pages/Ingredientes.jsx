import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Modal,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../api/api";
import Swal from "sweetalert2";
import { BtnAgg, BtnEdit, BtnDelete } from "../styles/Button";
import Loader from "../components/Loader";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";

const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "existencia", label: "Existencia" },
  { id: "acciones", label: "Acciones" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Ingredientes = () => {
  const [data, setData] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [ingrediente, setIngrediente] = useState({
    id: "",
    nombre: "",
    existencia: "",
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setIngrediente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Petincion GET
  const getProducts = async () => {
    try {
      const response = await instance.get("/ingredientes");
      return setData(response.data);
    } catch (err) {
      setData([]);
    }
  };

  // Peticion POST
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await instance.post("/ingredientes", ingrediente);
      const newData = [
        ...data,
        {
          id: response.data.id,
          nombre: response.data.nombre,
          existencia: response.data.existencia,
        },
      ];
      setData([...newData]);
      setLoading(false);
      setModalAgregar(false);
      toast.success("Ingrediente agregado correctamente");
    } catch (err) {
      setLoading(false);
      toast.error("Error al agregar ingrediente");
    }
  };

  // Peticion DELETE
  const deleteProduct = async (id) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `No podrás revertir esto!`,
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
        instance
          .delete(`/ingredientes/${id}`)
          .then((res) => {
            getProducts();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // Peticion PUT
  const editProduct = async (e) => {
    e.preventDefault();
    getProducts();
    try {
      await instance.put(`/ingredientes/${ingrediente.id}`, {
        nombre: ingrediente.nombre,
        existencia: ingrediente.existencia,
      });
      let newData = data.map((item) => {
        const currentExistencia = parseInt(item.existencia);
        if (item.id === ingrediente.id) {
          item.nombre = ingrediente.nombre;
          item.existencia =
            currentExistencia + parseInt(ingrediente.existencia);
        }
        return item;
      });
      setData(newData);
      setIngrediente({
        id: "",
        nombre: "",
        existencia: "",
      });
      setModalEditar(false);
      toast.success("Ingrediente actualizado correctamente");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Error al actualizar ingrediente");
    }
  };

  //Busca el elemento que tenga el ID y setea el hook ingrediente de la linea 26 :D
  const findAndEdit = (_id) => {
    //Data contiene todos los ingredientes de la BD, filtramos y buscamos el que tenga el ID que le pasamos
    let toFind = data.find((ingrediente) => ingrediente.id === _id);

    //Seteamos el hook ingrediente con el ingrediente que encontramos
    setIngrediente({
      id: _id,
      nombre: toFind.nombre,
      existencia: toFind.existencia,
    });
    setModalEditar(true);
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

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    console.log(ingrediente.id, "modal");
  };

  const bodyModalAgregar = (
    <Box sx={style}>
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Agregar ingrediente</h3>
      </div>
      <form onSubmit={addProduct}>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            required
            label="Nombre"
            name="nombre"
            type="text"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            label="Existencia"
            name="existencia"
            type="number"
            onChange={handleChange}
          />
        <div className="flex pt-3 gap-3">
          <BtnAgg type="submit" className="btn">
            {loading ? <Loader /> : "Agregar ingrediente"}
          </BtnAgg>
          <BtnDelete
            className="btnCancel"
            onClick={() => abrirCerrarModalAgregar()}
          >
            Cancelar
          </BtnDelete>
        </div>
      </form>
    </Box>
  );

  const bodyModalEditar = (
    <Box sx={style}>
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Editar ingrediente</h3>
      </div>
      <form onSubmit={editProduct}>
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label="Nombre"
          name="nombre"
          defaultValue={ingrediente.nombre}
          type="text"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Existencia"
          name="existencia"
          defaultValue={ingrediente.existencia}
          onChange={handleChange}
          type="number"
        />
        <div className="flex pt-3 gap-3">
          <BtnAgg type="submit" className="btn">
            {loading ? <Loader /> : "Editar ingrediente"}
          </BtnAgg>
          <BtnDelete
            className="btnCancel"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </BtnDelete>
        </div>
      </form>
    </Box>
  );

  return (
    <div className="w-full p-3">
      <ToastContainer />
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
        <BtnAgg onClick={() => abrirCerrarModalAgregar()}>
          Agregar ingrediente
        </BtnAgg>
      </div>
      <div className="mt-8">
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow style={{ background: "#D00000" }}>
                  {columns.map((column) => (
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
                  ? "No se encontraron ingredientes"
                  : filterData().map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.nombre}</TableCell>
                        <TableCell align="center">{item.existencia}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-5 justify-center">
                            <AiFillEdit
                              size={25}
                              onClick={() => findAndEdit(item.id)}
                              className="bg-naranja-vivido rounded-full p-1 text-white cursor-pointer"
                            />
                            <AiTwotoneDelete
                              size={25}
                              className="bg-rojo-fuerte rounded-full p-1 text-white cursor-pointer"
                              onClick={() => deleteProduct(item.id)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyModalAgregar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyModalEditar}
      </Modal>
    </div>
  );
};

export default Ingredientes;
