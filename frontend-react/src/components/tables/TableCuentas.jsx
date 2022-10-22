import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { Modal, Box } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import {instance} from '../../api/api'

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

const baseURL = "http://localhost:3001/usuarios";

const TableCuentas = () => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    idRol: "1",
    password: "",
    userName: "",
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
      return setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Peticion GET by ID
  const getPerson = async (e) => {
    e.preventDefault();
    try {
      let cedu = usuario.cedula
      if(cedu.length >= 1){
        const response = await instance.get(`/personas/${cedu}`);
        if(response.data){          
          return setUsuario({
            ...response.data,
            found: true,
          });
        }
      }
      return setUsuario({nombre: "", apellido: "", cedula: usuario.cedula, celular: "", idRol: "1"})
    } catch (err) {
      console.log(err);
    }
  }

  // Peticion POST
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/usuarios', usuario);
      getUsers();
      setModalInsertar(false)
      setUsuario({nombre: "", apellido: "", celular: "", idRol: "1"})
    } catch (err) {
      console.log(err);
    }
  };

  // Peticion PUT
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(baseURL + "/" + usuario.id, usuario);
      let newData = data;
      newData.map((user) => {
        if (user.id === usuario.id) {
          user.nombre = usuario.nombre;
          user.apellido = usuario.apellido;
          user.cargo = usuario.idRol;
          user.email = usuario.email;
          user.contraseña = usuario.password;
        }
      });
      return setData(newData,setModalEditar(false));
    } catch (err) {
      console.log(err);
    }
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
          .delete(`${baseURL}/${id}`)
          .then((response) => {
            setData(data.filter((usuario) => usuario.id !== id));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const abrirCerrarModal = () => {
    setModalInsertar(!modalInsertar);
    setUsuario({nombre: "", apellido: "", celular: "", idRol: "1"})
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
}

const seleccionarUsuario = (user, caso) => {
  setUsuario(user);
  (caso === "Editar") && abrirCerrarModalEditar() 
}

  // Contenido modal agregar
  const bodyInsertar = (
    <Box sx={style}>
      <div className="header-modal">
        <h3>Agregar Usuario</h3>
      </div>
      <form onSubmit={registerUser}>
        <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">Cedula</label>
            <input
              type="text"
              name="cedula"
              onChange={handleChange}
              onBlur={getPerson}
              className="inp"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">Nombre</label>
            <input
              type="text"
              name="nombre"
              onChange={handleChange}
              value={usuario.nombre}
              className="inp"
              disabled = { usuario.found }
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">Apellido</label>
            <input
              type="text"
              name="apellido"
              onChange={handleChange}
              value={usuario.apellido}
              className="inp"
              disabled = { usuario.found }
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">Telefono</label>
            <input
              type="text"
              name="celular"
              onChange={handleChange}
              value={usuario.celular}
              className="inp"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="inp"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">Usuario</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="inp"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-lg md:text-base">Cargo</label>
            <select
              name="idRol"
              onChange={handleChange}
              className="inp"
              required
            >
{/*               <option disabled className="text-black bg-white">
                Selecciona el cargo
              </option> */}
              <option  defaultValue="1" className="text-black bg-white">
                Mesero
              </option>
              <option value="2" className="text-black bg-white">
                Admin
              </option>
            </select>
          </div>
        </div>
        <div className="flex pt-3 gap-10">
              <button type="submit" className="btn">Crear</button>
              <button className="btn" onClick={() => abrirCerrarModal()}>Cancelar</button>
        </div>
      </form>
    </Box>
  );

  // Contenido modal editar
  const bodyEditar = (
    <Box sx={style}>
    <div className="header-modal">
      <h3>Agregar Usuario</h3>
    </div>
    <form onSubmit={updateUser}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">Nombre</label>
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={usuario && usuario.nombre}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">Apellido</label>
          <input
            type="text"
            name="apellido"
            onChange={handleChange}
            value={usuario && usuario.apellido}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">Cargo</label>
          <select
            name="cargo"
            onChange={handleChange}
            value={usuario && usuario.idRol}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          >
            <option name='0' value="todos" className="text-black bg-white">
              Selecciona el cargo
            </option>
            <option name='1' value="mesero" className="text-black bg-white">
              Mesero
            </option>
            <option name='2' value="admin" className="text-black bg-white">
              Admin
            </option>
          </select>
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">
            Contraseña
          </label>
          <input
            type="password"
            name="contraseña"
            onChange={handleChange}
            value={usuario && usuario.password}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">Usuario</label>
          <input
            type="text"
            name="usuario"
            onChange={handleChange}
            value={usuario && usuario.userName}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">Cedula</label>
          <input
            type="text"
            name="cedula"
            onChange={handleChange}
            value={usuario && usuario.cedula}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="font-semibold text-lg md:text-base">Telefono</label>
          <input
            type="text"
            name="telefono"
            onChange={handleChange}
            value={usuario && usuario.telefono}
            className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
          />
        </div>
      </div>
      <div className="flex pt-3 gap-10">
            <button className="btn" type="submit">Insertar</button>
            <button className="btn" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
      </div>
    </form>
  </Box>
  )

  return (
    <>
      <button className="btn mb-3" onClick={() => abrirCerrarModal()}>
        Agregar usuario
      </button>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                        onClick={() => seleccionarUsuario(item, "Editar")}
                      />
                      <AiTwotoneDelete
                        size={25}
                        className="bg-rojo-fuerte rounded-full p-1 text-white cursor-pointer"
                        onClick={() => deleteUser(item.id)}
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
