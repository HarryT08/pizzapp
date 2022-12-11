import { useRef, useState } from "react";
import { Transition, Loader } from "../..";
import { instance } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAggIngrediente = ({
    id,
    modalOpen,
    setModalOpen,
    data,
    setData,
}) => {
    const modalContent = useRef(null);
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

    // Peticion POST
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await instance.post("/ingredientes", ingrediente);
            const newData = [
                ...data,
                {
                    id: response.data.id,
                    nombre: response.data.nombre,
                    existencia: response.data.existencia,
                },
            ];
            setData([...newData]);
            setLoading(false);
            handleReset();
            toast.success("Ingrediente agregado correctamente");
        } catch (err) {
            setLoading(false);
            toast.error("Error al agregar ingrediente");
        }
    };

    const handleReset = () => {
        document.getElementById("formIngre").reset();
        setModalOpen(false)
    }
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
                    className="bg-white border border-slate-700 overflow-auto max-w-2xl p-3 max-h-full rounded shadow-lg"
                >
                    <div className="header-modal">
                        <h3 className="text-xl font-semibold">Agregar ingrediente</h3>
                    </div>
                    <form id='formIngre' onSubmit={addProduct}>
                        <div>
                            <label className="block text-base font-medium">Nombre</label>
                            <input
                                required
                                name="nombre"
                                type="text"
                                placeholder="Nombre"
                                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="block text-base font-medium">Existencia</label>
                            <input
                                required
                                name="existencia"
                                type="number"
                                placeholder="Existencia"
                                className="form-input mt-1 block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex mt-3 gap-3">
                            <button
                                type="submit"
                                className="rounded-md py-2 px-8 text-[10px] movilM:text-sm bg-azul-marino/20 text-azul-marino font-bold transition duration-300 ease-in-out hover:bg-azul-marino hover:text-white"
                            >
                                {loading ? <Loader /> : "Agregar ingrediente"}
                            </button>
                            <span
                                className="cursor-pointer rounded-md py-2 px-8 text-[10px] movilM:text-sm bg-rojo-fuerte/20 text-rojo-fuerte font-bold transition duration-300 ease-in-out hover:bg-rojo-fuerte hover:text-white"
                                onClick={handleReset}
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

export default ModalAggIngrediente;
