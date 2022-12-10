import { FiSearch } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ModalAggProducto, TableProductos } from "../../components";

const Productos = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">
      {/* Barra busqueda */}
      <div className="flex justify-between pb-3 border-b-2">
        <form>
        <div className="flex">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-2 movilM:px-2.5 py-1 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-azul-marino/20 focus-within:border-azul-marino focus:outline-none"
            />
            <div className="inline-flex">
              <button className="bg-azul-marino text-white border-2 border-azul-marino transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white hover:text-azul-marino">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-3">
        <button
          aria-controls="modal-addProduct"
          className={`btn ${
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
        <TableProductos search={search}/>
      </div>
      <ModalAggProducto id="modal-addProduct" modalOpen={modalAdd} setModalOpen={setModalAdd}/>
    </div>
  );
};

export default Productos;
