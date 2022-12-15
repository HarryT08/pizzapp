import { useState } from "react";
import { instance } from "../../../../api/api";
import { ModalEditCuenta } from "../../../";
import Alert from '@mui/material/Alert';
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
import Swal from "sweetalert2";

const columns = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "cargo", label: "Cargo" },
  { id: "acciones", label: "Acciones" },
];

const TableCuentas = ({
  error,
  data,
  getUsers
}) => {

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleOpenEditModal = () => setModalEditOpen(true);
  const handleCloseEditModal = () => setModalEditOpen(false);
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

  //Obtención del id del usuario a editar
  const edit = (cedu) => {
    let user = data.filter((user) => user.cedula === cedu);
    setUsuario(user[0]);
    setEmpleado({
      persona: user[0].persona,
      rol: user[0].rol,
    });
    handleOpenEditModal();
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

  return (
    <>
    {console.log(data)}
      {data.length === 0 ? (
        <Alert severity="error"><strong>No hay cuentas registradas.</strong></Alert>
      ) :(
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
      )}
      <ModalEditCuenta
        getUsers={getUsers}
        modalEditOpen={modalEditOpen}
        handleCloseEditModal={handleCloseEditModal}
        usuario={usuario}
        setUsuario={setUsuario}
        empleado={empleado}
      />
      
    </>
  );
};

export default TableCuentas;
