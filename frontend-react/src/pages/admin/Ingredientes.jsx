import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "@/api/api";
import { ModalAggIngrediente, TableIngredientes, Header } from "@/components";
import { AddedButton } from "@/components/mui/Buttons";

const pesajes = [
  {
    value: "G",
    label: "G",
  },
  {
    value: "Kg",
    label: "Kg",
  },
  {
    value: "Oz",
    label: "Oz",
  },
  {
    value: "Lb",
    label: "Lb",
  },
];

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
      toast.error("No se pudo obtener los ingredientes");

      setData([]);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <Header
        title="Ingredientes"
        subtitle="Encontraras y administraras todos los ingredientes de tu restaurante."
      />
      <div className="flex justify-between my-5">
        <AddedButton onClick={handleOpenModal}>Agregar ingrediente</AddedButton>

        <div className="bg-white border-2 border-azul-marino/20 focus-within:border-azul-marino flex items-center rounded-md">
          <div className="px-3">
            <IoIosSearch size={20} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Buscar..."
            className="w-full py-2 focus:outline-none sm:text-sm rounded-md"
          />
        </div>
      </div>

      <ModalAggIngrediente
        pesajes={pesajes}
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
          pesajes={pesajes}
        />
      </div>
    </div>
  );
};

export default Ingredientes;
