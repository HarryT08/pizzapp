import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { Modal, Box, TextField, MenuItem } from "@mui/material";
import { BtnAgg, BtnDelete } from "../../styles/Button";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

const columns = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "cargo", label: "Cargo" },
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

const TableCuentas = () => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empleado, setEmpleado] = useState({
    persona: {
      nombre: "",
      apellido: "",
      celular: "",
    },
    rol: {
      id: "",
      nombre: "",
    },
  });
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    idRol: "1",
    password: "",
    username: "",
    cedula: "",
    celular: "",
    found: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Peticion GET
  const getUsers = async () => {
    try {
      const response = await instance.get("/usuarios");
      setError(false);
      return setData(response.data);
    } catch (err) {
      setError(true);
      setData([]);
    }
  };

  // Peticion GET by ID
  const getPerson = async (e) => {
    e.preventDefault();
    try {
      let cedu = usuario.cedula;
      if (cedu.length >= 1) {
        const response = await instance.get(`/personas/${cedu}`);
        if (response.data) {
          return setUsuario({
            ...response.data,
            found: true,
          });
        }
      }
      return setUsuario({
        nombre: "",
        apellido: "",
        cedula: usuario.cedula,
        celular: "",
        idRol: "1",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Peticion POST
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await instance.post("/usuarios", usuario);
      getUsers();
      setModalInsertar(false);
      toast.success("Usuario registrado con exito");
      setUsuario({ nombre: "", apellido: "", celular: "", idRol: "1" });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Peticion PUT
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await instance.put("/usuarios", usuario);
      getUsers();
      setModalEditar(false);
      toast.success("Usuario actualizado con exito");
      setUsuario({
        nombre: "",
        apellido: "",
        celular: "",
        idRol: "1",
        password: "",
        username: "",
        cedula: "",
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //Obtención del id del usuario a editar
  const edit = (cedu) => {
    let user = data.filter((user) => user.cedula === cedu);
    setUsuario(user[0]);
    setEmpleado({
      persona: user[0].persona,
      rol: user[0].rol,
    });
    setModalEditar(true);
  };

  // Peticion DELETE
  const deleteUser = (id) => {
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
          .delete(`usuarios/${id}`)
          .then((response) => {
            getUsers();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const abrirCerrarModal = () => {
    setModalInsertar(!modalInsertar);
    setUsuario({ nombre: "", apellido: "", celular: "", idRol: "1" });
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    setEmpleado({
      persona: { nombre: "", apellido: "", celular: "" },
      rol: { id: "", nombre: "" },
    });
  };

  // Contenido modal agregar
  const bodyInsertar = (
    <Box sx={style}>
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Agregar Usuario</h3>
      </div>
      <form onSubmit={registerUser}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <TextField
              required
              name="cedula"
              label="Cedula"
              type="number"
              onChange={handleChange}
              onBlur={getPerson}
            />
          </div>
          <div className="mt-2">
            <TextField
              label="nombre"
              type="text"
              name="nombre"
              onChange={handleChange}
              value={usuario.nombre}
              className="inp"
              disabled={usuario.found}
              required
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Apellido"
              type="text"
              name="apellido"
              onChange={handleChange}
              value={usuario.apellido}
              disabled={usuario.found}
              required
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Telefono"
              type="number"
              name="celular"
              onChange={handleChange}
              value={usuario.celular}
              required
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Usuario"
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <TextField
              label="Categorias"
              select
              name="idRol"
              value={usuario.idRol}
              onChange={handleChange}
              required
            >
              <MenuItem value="1">Mesero</MenuItem>
              <MenuItem value="2">Admin</MenuItem>
            </TextField>
          </div>
        </div>
        <div className="flex pt-3 gap-3">
          <BtnAgg type="submit" className="btn">
            {loading ? <Loader /> : "Agregar usuario"}
          </BtnAgg>
          <BtnDelete className="btnCancel" onClick={() => abrirCerrarModal()}>
            Cancelar
          </BtnDelete>
        </div>
      </form>
    </Box>
  );

  // Contenido modal editar
  const bodyEditar = (
    <Box sx={style}>
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Modificar Usuario</h3>
      </div>
      <form onSubmit={updateUser}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <TextField
              label="Cedula"
              type="number"
              name="cedula"
              onChange={handleChange}
              value={usuario && usuario.cedula}
              disabled
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Nombre"
              type="text"
              name="nombre"
              onChange={handleChange}
              defaultValue={empleado && empleado.persona.nombre}
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Apellido"
              type="text"
              name="apellido"
              onChange={handleChange}
              defaultValue={empleado && empleado.persona.apellido}
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Telefono"
              type="number"
              name="celular"
              onChange={handleChange}
              defaultValue={empleado && empleado.persona.celular}
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Usuario"
              type="text"
              name="username"
              onChange={handleChange}
              defaultValue={usuario && usuario.username}
            />
          </div>
          <div className="flex flex-col mt-2">
            <TextField
              label={empleado && empleado.rol.nombre}
              select
              value={usuario && usuario.idRol}
              name="idRol"
              onChange={handleChange}
            >
              <MenuItem
                value="1"
                selected={empleado.rol.id === 1 ? true : false}
              >
                Mesero
              </MenuItem>
              <MenuItem
                value="2"
                selected={empleado.rol.id === 2 ? true : false}
              >
                Admin
              </MenuItem>
            </TextField>
          </div>
        </div>
        <div className="flex pt-3 gap-3">
          <BtnAgg type="submit">
            {loading ? <Loader /> : "Editar usuario"}
          </BtnAgg>
          <BtnDelete onClick={() => abrirCerrarModalEditar()}>
            Cancelar
          </BtnDelete>
        </div>
      </form>
    </Box>
  );

  return (
    <>
      <BtnAgg sx={{ marginBottom: 1 }} onClick={() => abrirCerrarModal()}>
        Agregar usuario
      </BtnAgg>
      <ToastContainer />
      <Paper>
        <TableContainer component={Paper}>
          {error && (
            <div className="flex justify-center">
              <p className="text-center">No existen usuarios</p>
            </div>
          )}
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow style={{ background: "#D00000" }}>
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
              {data.map((item) => (
                <TableRow key={item.cedula}>
                  <TableCell
                    style={{ fontFamily: "Montserrat" }}
                    align="center"
                  >
                    {item.cedula}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Montserrat" }}
                    align="center"
                  >
                    {item.persona.nombre + " " + item.persona.apellido}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Montserrat" }}
                    align="center"
                  >
                    <p className="bg-azul-marino/20 rounded-md p-1 text-azul-marino">
                      {item.rol.nombre}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-5 justify-center">
                      <AiFillEdit
                        size={25}
                        className="bg-naranja-vivido rounded-full p-1 text-white cursor-pointer"
                        onClick={() => edit(item.cedula)}
                      />
                      <AiTwotoneDelete
                        size={25}
                        className="bg-rojo-fuerte rounded-full p-1 text-white cursor-pointer"
                        onClick={() => deleteUser(item.cedula)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal open={modalInsertar} onClose={abrirCerrarModal}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
    </>
  );
};

export default TableCuentas;
