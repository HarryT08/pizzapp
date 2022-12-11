import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
} from "@mui/material";
import { instance } from "../../../api/api";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";

// Columnas de los productos
const columnsProductos = [
    { id: "nombre", label: "Nombre" },
    { id: "precio", label: "Precio" },
    { id: "acciones", label: "Acciones" },
];

const TableProductos = ({ search, products, getProductos }) => {
    const [pageProducts, setPageProducts] = useState(0);
    const [rowsProducts, setRowsProducts] = useState(10);

    // Paginacion tabla productos
    const handleChangePageProducts = (event, newPage) => {
        setPageProducts(newPage);
    };

    const handleChangeRowsPerPageProducts = (event) => {
        setRowsProducts(+event.target.value);
        setPageProducts(0);
    };

    // Funcion para eliminar productos
    const deleteProduct = (id) => {
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
                Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
                instance
                    .delete(`/productos/${id}`)
                    .then((res) => {
                        getProductos();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    // Funcion para filtrar los productos
    const filterData = () => {
        return products.filter((val) => {
            if (search === "") {
                return val;
            } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
                return val;
            }
        });
    };

    return (
        <>
            {/* Mostrar o no la tabla si hay productos o no */}
            {products.length === 0 ? (
                <p className="text-center">No hay productos</p>
            ) : (
                <Paper>
                    {filterData().length === 0 ? (
                        <p className="text-center">Este producto no se ha agregado</p>
                    ) : (
                        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
                            <Table>
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
                                    {filterData()
                                        .slice(
                                            pageProducts * rowsProducts,
                                            pageProducts * rowsProducts + rowsProducts
                                        )
                                        .map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{item.nombre}</TableCell>
                                                <TableCell align="center">{item.costo}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-5 justify-center">
                                                        <AiFillEdit
                                                            size={25}
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
                        count={products.length}
                        rowsPerPage={rowsProducts}
                        page={pageProducts}
                        onPageChange={handleChangePageProducts}
                        onRowsPerPageChange={handleChangeRowsPerPageProducts}
                    />
                </Paper>
            )}
        </>
    );
};

export default TableProductos;
