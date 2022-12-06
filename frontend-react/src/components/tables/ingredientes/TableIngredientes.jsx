import {
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { instance } from "../../../api/api";
import Swal from "sweetalert2";

const columns = [
    { id: "nombre", label: "Nombre" },
    { id: "existencia", label: "Existencia" },
    { id: "acciones", label: "Acciones" },
];

const TableIngredientes = ({ data, setData, search, getProducts }) => {
    const [modalEditar, setModalEditar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ingrediente, setIngrediente] = useState({
        id: "",
        nombre: "",
        existencia: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setIngrediente((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    };

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
                <div className="mt-3">
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
                    <button
                        type="submit"
                        className="rounded-md py-2 px-8 text-[10px] movilM:text-sm border-2 border-azul-marino/20 bg-azul-marino/20 text-azul-marino font-bold transition duration-300 ease-in-out hover:bg-azul-marino hover:text-white"
                    >
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
        <>
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
            <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
                {bodyModalEditar}
            </Modal>
        </>
    );
};

export default TableIngredientes;
