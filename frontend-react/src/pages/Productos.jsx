import { FiSearch } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ModalAggProducto, TableProductos } from "../components";

const Productos = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">
      {/* Barra busqueda */}
      <div className="flex justify-between pb-3 border-b-2">
        <form>
          <div className="relative flex items-center text-gray-400 focus-within:text-azul-marino border-2 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-3 py-2 placeholder-gray-500 text-black rounded-lg border-none focus:outline-none"
            />
            <FiSearch className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-3">
        <button
          aria-controls="modal-addProduct"
          className={`btn font-medium px-3 py-2 text-sm movilM:text-base rounded-lg ${
            modalAdd && "bg-slate-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setModalAdd(true);
          }}
        >
          Agregar producto
        </button>
      </div>

      {/* DataTable Productos */}
      <div className="mt-3">
        <TableProductos />
      </div>
      <ModalAggProducto id="modal-addProduct" modalOpen={modalAdd} setModalOpen={setModalAdd}/>
    </div>
  );
};

export default Productos;
