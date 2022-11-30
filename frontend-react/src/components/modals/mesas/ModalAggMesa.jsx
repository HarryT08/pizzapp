import { useRef } from "react";
import { Transition, Tap } from "../..";

const ModalAggMesa = ({ id, modalOpen, setModalOpen }) => {
    const modalContent = useRef(null);

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
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="my-2 flex flex-col">
                            <label className="block text-base font-medium">Numero de la mesa</label>
                            <input type="number" placeholder="Numero" className="block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-azul-marino focus:ring-azul-marino sm:text-sm"/>
                        </div>
                        <div className="flex pt-3 gap-3">
                            <button className="btn">Agregar</button>
                            <button className="btnCancel" onClick={() => setModalOpen(false)}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </Transition>
        </Transition>
    );
};

export default ModalAggMesa;
