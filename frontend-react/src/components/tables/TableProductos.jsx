import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper
} from "@mui/material";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";

// Columnas de los productos
const columnsProductos = [
    { id: "imagen", label: "Imagen" },
    { id: "nombre", label: "Nombre" },
    { id: "precio", label: "Precio" },
    { id: "acciones", label: "Acciones" },
];

const TableProductos = () => {
    const [pageProducts, setPageProducts] = useState(0);
    const [rowsProducts, setRowsProducts] = useState(10);
    const { handleDelete, data } = useStateContext();
    const [search, setSearch] = useState("");

    // show products
    const getProductos = async() => {
        try{
            const response = await instance.get('/productos');
        }catch(err){
            console.log(err);
        }
    }


    // Paginacion tabla productos
    const handleChangePageProducts = (event, newPage) => {
        setPageProducts(newPage);
    };

    const handleChangeRowsPerPageProducts = (event) => {
        setRowsProducts(+event.target.value);
        setPageProducts(0);
    };

    // Funcion para eliminar productos
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
                handleDelete(id);
                Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
            }
        });
    };

    // Funcion para filtrar los productos
    const filterData = () => {
        return data.filter((val) => {
            if (search === "") {
                return val;
            } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
                return val;
            }
        });
    };
    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow style={{ background: "#D00000" }}>
                            {columnsProductos.map((column) => (
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
                            ? "No hay Productos"
                            : filterData()
                                .slice(
                                    pageProducts * rowsProducts,
                                    pageProducts * rowsProducts + rowsProducts
                                )
                                .map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center">
                                            <div className="flex justify-center">
                                                <img
                                                    src={item.img}
                                                    alt="Imagen"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{item.nombre}</TableCell>
                                        <TableCell align="center">{item.precio}</TableCell>
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
            <TablePagination
                style={{ width: "100%" }}
                rowsPerPageOptions={[10, 50, 100, 200]}
                component="div"
                count={data.length}
                rowsPerPage={rowsProducts}
                page={pageProducts}
                onPageChange={handleChangePageProducts}
                onRowsPerPageChange={handleChangeRowsPerPageProducts}
            />
        </Paper>
    );
};

export default TableProductos;
