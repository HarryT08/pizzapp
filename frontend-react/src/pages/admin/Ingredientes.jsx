import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../api/api";
import { ModalAggIngrediente, TableIngredientes } from "../../components";

const Ingredientes = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getIngredientes();
  }, []);

  // Petincion GET
  const getIngredientes = async () => {
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
              className="px-2 movilM:px-2.5 py-1 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-azul-marino/20 focus-within:border-azul-marino focus:outline-none"
            />
            <div className="inline-flex">
              <button className="bg-azul-marino text-white border-2 border-azul-marino transition duration-500 px-2 movilM:px-2.5 rounded-r-lg hover:bg-white  hover:text-azul-marino">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Boton agg ingredientes */}
      <div className="mt-3">
        <button
          className="btn"
          onClick={handleOpenModal}
        >
          Agregar ingrediente
        </button>
      </div>

      <ModalAggIngrediente
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        setModalOpen={setModalOpen}
        data={data}
        setData={setData}
      />

      <div className="mt-3">
        <TableIngredientes
          data={data}
          setData={setData}
          search={search}
          getIngredientes={getIngredientes}
        />
      </div>
    </div>
  );
};

export default Ingredientes;
