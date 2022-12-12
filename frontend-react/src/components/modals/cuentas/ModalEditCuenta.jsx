import { Modal, Fade, Box } from "@mui/material";
import { useState } from "react";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import {Loader} from '../../../components'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
};

const ModalEditCuenta = ({ handleCloseModal, modalOpen, usuario, setUsuario, empleado, getUsers }) => {

    const [loading, setLoading] = useState(false);

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
            handleCloseModal();
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

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalOpen}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <Fade in={modalOpen}>
                <Box sx={style}>
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
                                <label className="block text-base font-medium">
                                    Contraseña
                                </label>
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
                                    <option
                                        value="1"
                                        selected={empleado.rol.id === 1 ? true : false}
                                    >
                                        Mesero
                                    </option>
                                    <option
                                        value="2"
                                        selected={empleado.rol.id === 2 ? true : false}
                                    >
                                        Admin
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex pt-3 gap-3">
                            <button className="btn" type="submit">
                                {loading ? <Loader /> : "Editar usuario"}
                            </button>
                            <span
                                className="btnCancel cursor-pointer"
                                onClick={() => handleCloseModal()}
                            >
                                Cancelar
                            </span>
                        </div>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalEditCuenta;
