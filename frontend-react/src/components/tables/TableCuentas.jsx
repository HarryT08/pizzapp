import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { useStateContext } from "../../context/ContextProvider";

const columns = [
  { id: "id", label: "Id" },
  { id: "nombre", label: "Nombre" },
  { id: "cargo", label: "Cargo" },
  { id: "acciones", label: "Acciones" },
];

const TableCuentas = () => {
  const { handleDeleteAccount, dataAccount } = useStateContext();

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
        handleDeleteAccount(id);
        Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
      }
    });
  };

  return (
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
            {dataAccount.map((item) => (
              <TableRow key={item.id}>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {item.id}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  {item.nombre}
                </TableCell>
                <TableCell style={{ fontFamily: "Montserrat" }} align="center">
                  <p className="bg-azul-marino/20 rounded-md p-1 text-azul-marino">
                    {item.cargo}
                  </p>
                </TableCell>
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
    </Paper>
  );
};

export default TableCuentas;
