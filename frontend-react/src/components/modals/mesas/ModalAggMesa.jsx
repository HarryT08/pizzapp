import { useState } from "react";
import { instance } from "../../../api/api";
import { useRef } from "react";
import { Transition, Loader } from "../..";
import { toast } from "react-toastify";

const ModalAggMesa = ({ id, modalOpen, setModalOpen, getMesas }) => {

    const [loading, setLoading] = useState(false);
    const [numeroMesa, setNumeroMesa] = useState({
        id: "",
    });
    const modalContent = useRef(null);

    const cleanButtonCancel = () => {
        document.getElementById("formMesa").reset();
        setModalOpen(false);
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
            getMesas()
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if(err.response.status === 404){
                toast.error("Ya existe una mesa con ese numero");
            }else if(err.response.status === 500){
                toast.error("No se pudo agregar la mesa");
            }
            console.log(err);
        }
    };

    return (
        <Transition
            className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
            show={modalOpen}
            enter="transition ease-out duration-200"
            enterStart="opacity-0"
            enterEnd="opacity-100"
            leave="transition ease-out duration-100"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
            aria-hidden="true"
        >
            <Transition
                id={id}
                className="fixed inset-0 z-50 overflow-hidden flex items-center top-20 mb-4 justify-center transform px-4 sm:px-6"
                role="dialog"
                aria-modal="true"
                show={modalOpen}
                enter="transition ease-in-out duration-200"
                enterStart="opacity-0 translate-y-4"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveStart="opacity-100 translate-y-0"
                leaveEnd="opacity-0 translate-y-4"
            >
                <div
                    ref={modalContent}
                    className="bg-white dark:bg-[#191919]/95 border border-slate-700 dark:border-gray-700 overflow-auto max-w-2xl p-3 max-h-full rounded shadow-lg"
                >
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
                                name='id'
                                placeholder="Numero"
                                className="block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex pt-3 gap-3">
                            <button className="btn">
                                {loading ? <Loader/> : "Agregar"}
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
            </Transition>
        </Transition>
    );
};

export default ModalAggMesa;
