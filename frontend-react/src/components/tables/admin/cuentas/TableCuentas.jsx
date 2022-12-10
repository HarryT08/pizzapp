import { useState } from "react";
import { instance } from "../../../../api/api";
import { Loader } from "../../../";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { Modal } from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "cargo", label: "Cargo" },
  { id: "acciones", label: "Acciones" },
];

const TableCuentas = ({ error, data, getUsers }) => {
  const [modalEditar, setModalEditar] = useState(false);
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

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    setEmpleado({
      persona: { nombre: "", apellido: "", celular: "" },
      rol: { id: "", nombre: "" },
    });
  };

  // Contenido modal editar
  const bodyEditar = (
    <div className="modal">
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Modificar Usuario</h3>
      </div>
      <form onSubmit={updateUser}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <label className="block text-base font-medium">Cedula</label>
            <input
              type="number"
              name="cedula"
              value={usuario && usuario.cedula}
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
              disabled
            />
          </div>
          <div className="mt-2">
            <label className="block text-base font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              defaultValue={empleado && empleado.persona.nombre}
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base font-medium">Apellido</label>
            <input
              type="text"
              name="apellido"
              defaultValue={empleado && empleado.persona.apellido}
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base font-medium">Telefono</label>
            <input
              type="number"
              name="celular"
              defaultValue={empleado && empleado.persona.celular}
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              defaultValue={usuario && usuario.username}
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="block text-base font-medium">Cargo</label>
            <select
              name="idRol"
              onChange={handleChange}
              className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
            >
              <option value="1" selected={empleado.rol.id === 1 ? true : false}>
                Mesero
              </option>
              <option value="2" selected={empleado.rol.id === 2 ? true : false}>
                Admin
              </option>
            </select>
          </div>
        </div>
        <div className="flex pt-3 gap-3">
          <button className="btn" type="submit">
            {loading ? <Loader /> : "Editar usuario"}
          </button>
          <button
            className="btnCancel"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
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

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
    </>
  );
};

export default TableCuentas;
