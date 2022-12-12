import { useState } from "react";
import { instance } from "../../../api/api";
import { Modal, Fade } from "@mui/material";
import { Loader } from "../..";
import { toast } from "react-toastify";

const ModalAggMesa = ({
    modalOpen,
    getMesas,
    handleCloseModal,
}) => {
    const [loading, setLoading] = useState(false);
    const [numeroMesa, setNumeroMesa] = useState({
        id: "",
    });

    const cleanButtonCancel = () => {
        document.getElementById("formMesa").reset();
        handleCloseModal()
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNumeroMesa((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const sendMesa = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await instance.post("/mesas", numeroMesa);
            toast.success("Mesa agregada");
            cleanButtonCancel();
            getMesas();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.response.status === 404) {
                toast.error("Ya existe una mesa con ese numero");
            } else if (err.response.status === 500) {
                toast.error("No se pudo agregar la mesa");
            }
            console.log(err);
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
                <div className="modal">
                    <div className="header-modal">
                        <h3 className="text-xl font-semibold">Agregar mesas</h3>
                    </div>
                    <form id="formMesa" onSubmit={sendMesa}>
                        <div className="my-2 flex flex-col">
                            <label className="block text-base font-medium">
                                Numero de la mesa
                            </label>
                            <input
                                required
                                type="number"
                                name="id"
                                placeholder="Numero"
                                className="block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex pt-3 gap-3">
                            <button className="btn">
                                {loading ? <Loader /> : "Agregar"}
                            </button>
                            <span
                                className="btnCancel cursor-pointer"
                                onClick={cleanButtonCancel}
                            >
                                Cancelar
                            </span>
                        </div>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default ModalAggMesa;
