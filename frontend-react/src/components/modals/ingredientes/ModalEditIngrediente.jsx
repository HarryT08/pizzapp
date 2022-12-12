import { useState } from "react";
import { Loader } from "../..";
import { Modal, Fade } from "@mui/material";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEditIngrediente = ({
    openModalEdit,
    handleCloseModalEdit,
    ingrediente,
    setIngrediente,
    data,
    setData,
    getIngredientes,
}) => {
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setIngrediente((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Peticion PUT
    const editProduct = async (e) => {
        e.preventDefault();
        getIngredientes();
        try {
            setLoading(true);
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
            handleCloseModalEdit();
            toast.success("Ingrediente actualizado correctamente");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error("Error al actualizar ingrediente");
        }
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalEdit}
            onClose={handleCloseModalEdit}
            closeAfterTransition
        >
            <Fade in={openModalEdit}>
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
                                onClick={handleCloseModalEdit}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default ModalEditIngrediente;
