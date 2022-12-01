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
  };

  const bodyModalAgregar = (
    <div className="modal">
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Agregar ingrediente</h3>
      </div>
      <form onSubmit={addProduct}>
        <div>
          <label className="block text-base font-medium">Nombre</label>
          <input
            required
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <label className="block text-base font-medium">Existencia</label>
          <input
            required
            name="existencia"
            type="number"
            placeholder="Existencia"
            className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            onChange={handleChange}
          />
        </div>
        <div className="flex mt-3 gap-3">
          <button
            type="submit"
            className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-azul-marino/20 bg-azul-marino/20 text-azul-marino font-bold transition duration-300 ease-in-out hover:bg-azul-marino hover:text-white"
          >
            {loading ? <Loader /> : "Agregar ingrediente"}
          </button>
          <button
            className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white"
            onClick={() => abrirCerrarModalAgregar()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  const bodyModalEditar = (
    <div className="modal">
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Editar ingrediente</h3>
      </div>
      <form onSubmit={editProduct}>
        <div>
          <label className="block text-base font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            defaultValue={ingrediente.nombre}
            onChange={handleChange}
            className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
          />
        </div>
        <div className='mt-3'>
          <label className="block text-base font-medium">Existencia</label>
          <input
            type="number"
            name="existencia"
            defaultValue={ingrediente.existencia}
            onChange={handleChange}
            className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
          />
        </div>
        <div className="flex pt-3 gap-3">
          <button type="submit" className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-azul-marino/20 bg-azul-marino/20 text-azul-marino font-bold transition duration-300 ease-in-out hover:bg-azul-marino hover:text-white">
            {loading ? <Loader /> : "Editar ingrediente"}
          </button>
          <button
            className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-rojo-fuerte/20 bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full">
      <ToastContainer />
      {/* Barra busqueda */}
      <div className="flex justify-between pb-3 border-b-2">
        <form>
          <div className="flex">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-2 movilM:px-2.5 py-1 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-azul-marino/20 focus-within:border-azul-marino dark:focus-within:border-white focus:outline-none"
            />
            <div className="inline-flex">
              <button className="bg-azul-marino dark:bg-black text-white border-2 border-azul-marino dark:border-black/20 transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white  hover:text-azul-marino dark:hover:text-black dark:hover:bg-white">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-3">
        <button className="btn" onClick={() => abrirCerrarModalAgregar()}>
          Agregar ingrediente
        </button>
      </div>
      <div className="mt-3">
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
