import { useState } from "react";
import Alert from '@mui/material/Alert';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";
import { ModalEditIngrediente } from "../../../";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { instance } from "../../../../api/api";
import Swal from "sweetalert2";

const columns = [
    { id: "nombre", label: "Nombre" },
    { id: "existencia", label: "Existencia" },
    { id: "acciones", label: "Acciones" },
];

const TableIngredientes = ({ data, setData, search, getIngredientes }) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const handleOpenModalEdit = () => setOpenModalEdit(true);
    const handleCloseModalEdit = () => setOpenModalEdit(false);
    const [pageIngredientes, setPageIngredientes] = useState(0);
    const [rowsIngredientes, setRowsIngredientes] = useState(10);
    const [ingrediente, setIngrediente] = useState({
        id: "",
        nombre: "",
        existencia: "",
    });

    // Paginacion tabla Ingredientes
    const handleChangePageIngredientes = (event, newPage) => {
        setPageIngredientes(newPage);
    };

    const handleChangeRowsPerPageIngredientes = (event) => {
        setRowsIngredientes(+event.target.value);
        setPageIngredientes(0);
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
        handleOpenModalEdit();
    };


    return (
        <>
            {data.length === 0 ? (
                <Alert severity="error"><strong>No hay mesas disponibles para Facturar</strong></Alert>
            ) : (
                <Paper>
                    {filterData().length === 0 ? (
                        <p className="text-center">Este ingrediente no ha sido agregado</p>
                    ) : (
                        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
                            <Table>
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
                                    {filterData()
                                        .slice(
                                            pageIngredientes * rowsIngredientes,
                                            pageIngredientes * rowsIngredientes + rowsIngredientes
                                        )
                                        .map((item) => (
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
                    )}
                    <TablePagination
                        style={{ width: "100%" }}
                        rowsPerPageOptions={[10, 50, 100, 200]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsIngredientes}
                        page={pageIngredientes}
                        onPageChange={handleChangePageIngredientes}
                        onRowsPerPageChange={handleChangeRowsPerPageIngredientes}
                    />
                </Paper>
            )}

            <ModalEditIngrediente
                data={data}
                setData={setData}
                getIngredientes={getIngredientes}
                openModalEdit={openModalEdit}
                handleCloseModalEdit={handleCloseModalEdit}
                ingrediente={ingrediente}
                setIngrediente={setIngrediente}
            />
        </>
    );
};

export default TableIngredientes;
