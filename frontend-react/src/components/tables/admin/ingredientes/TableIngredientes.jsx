import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { ModalEditIngrediente, Alerta } from "@/components";
import { IoIosTrash, IoMdBuild } from "react-icons/io";
import { instance } from "@/api/api";
import { labelDisplayedRows, labelRowsPerPage } from "@/i18n";
import { DeletedButton, UpdateButton } from "@/components/mui/Buttons";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const columns = [
  { id: "nombre", label: "Nombre" },
  { id: "existencia", label: "Existencia" },
  { id: "acciones", label: "Acciones" },
];

const TableIngredientes = ({
  data,
  setData,
  search,
  getIngredientes,
  pesajes,
}) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => setOpenModalEdit(false);
  const [pageIngredientes, setPageIngredientes] = useState(0);
  const [rowsIngredientes, setRowsIngredientes] = useState(10);
  const [ingrediente, setIngrediente] = useState({
    id: "",
    nombre: "",
    existencia: "",
    pesaje: "G",
  });

  const [ingredienteAnterior, setIngredienteAnterior] = useState({
    existencia: "",
    pesaje: "",
  });

  const onEditIngrediente = (item) => {
    setIngredienteAnterior({
      existencia: item.existencia,
      pesaje: item.pesaje,
    });
    setIngrediente({
      id: item.id,
      nombre: item.nombre,
      existencia: item.existencia,
      pesaje: item.pesaje,
    });
    handleOpenModalEdit();
    console.log("Ingrediente Anterior ->", ingredienteAnterior)
    console.log("Ingrediente ->", ingrediente)
  };

  // Paginacion tabla Ingredientes
  const handleChangePageIngredientes = (event, newPage) => {
    setPageIngredientes(newPage);
  };

  const handleChangeRowsPerPageIngredientes = (event) => {
    setRowsIngredientes(+event.target.value);
    setPageIngredientes(0);
  };

  const filterData = () => {
    return data.filter((ingrediente) => {
      return (
        search === "" ||
        ingrediente.nombre.toLowerCase().includes(search.toLowerCase())
      );
    });
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
            getIngredientes();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // const findIngrediente = (id) => {
  //   let toFind = data.find((ingrediente) => ingrediente.id === id);
  //   setIngrediente(toFind);
  //   handleOpenModalEdit();
  // };

  return (
    <>
      {data.length === 0 ? (
        <Alerta alerta="error" descripcion="No hay ingredientes" />
      ) : (
        <Box height="80vh">
          {filterData().length === 0 ? (
            <p className="text-center">Este ingrediente no ha sido agregado</p>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#D00000" }}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          sx={{
                            color: "#ffffff",
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
                    {filterData()
                      .slice(
                        pageIngredientes * rowsIngredientes,
                        pageIngredientes * rowsIngredientes + rowsIngredientes
                      )
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">{item.nombre}</TableCell>
                          <TableCell align="center">
                            {item.existencia}g
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-5 justify-center">
                              <DeletedButton
                                onClick={() => deleteProduct(item.id)}
                              >
                                <IoIosTrash size={20} />
                              </DeletedButton>
                              <UpdateButton
                                onClick={() => onEditIngrediente(item)}
                              >
                                <IoMdBuild size={20} />
                              </UpdateButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{
                  backgroundColor: "#D00000",
                  color: "#FFFFFF",
                  width: "100%",
                  "& .MuiSvgIcon-root": {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                rowsPerPageOptions={[10, 50, 100, 200]}
                component="div"
                count={data.length}
                rowsPerPage={rowsIngredientes}
                page={pageIngredientes}
                onPageChange={handleChangePageIngredientes}
                onRowsPerPageChange={handleChangeRowsPerPageIngredientes}
                labelRowsPerPage={labelRowsPerPage}
                labelDisplayedRows={labelDisplayedRows}
              />
            </>
          )}
        </Box>
      )}

      <ModalEditIngrediente
        data={data}
        setData={setData}
        getIngredientes={getIngredientes}
        openModalEdit={openModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        ingrediente={ingrediente}
        setIngrediente={setIngrediente}
        pesajes={pesajes}
        ingredienteAnterior={ingredienteAnterior}
        setIngredienteAnterior={setIngredienteAnterior}
      />
    </>
  );
};

export default TableIngredientes;
