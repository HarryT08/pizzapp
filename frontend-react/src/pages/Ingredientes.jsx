import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../api/api";
import { ModalAggIngrediente, TableIngredientes } from "../components";

const Ingredientes = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  // Petincion GET
  const getProducts = async () => {
    try {
      const response = await instance.get("/ingredientes");
      return setData(response.data);
    } catch (err) {
      setData([]);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer />
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
              className="px-2 movilM:px-2.5 py-1 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-azul-marino/20 focus-within:border-azul-marino dark:focus-within:border-white focus:outline-none"
            />
            <div className="inline-flex">
              <button className="bg-azul-marino dark:bg-black text-white border-2 border-azul-marino dark:border-black/20 transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white  hover:text-azul-marino dark:hover:text-black dark:hover:bg-white">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-3">
        <button
          aria-controls="modal-addIngredientes"
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
        >
          Agregar ingrediente
        </button>
      </div>
      
      <ModalAggIngrediente
        id="modal-addIngredientes"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={data}
        setData={setData}
      />

      <div className="mt-3">
        <TableIngredientes data={data} setData={setData} search={search} getProducts={getProducts}/>
      </div>

    </div>
  );
};

export default Ingredientes;
