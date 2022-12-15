import { useEffect, useState } from "react";
import { instance } from "../../api/api";
import { ModalAggCuenta, TableCuentas } from "../../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cuentas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [data, setData] = useState([]);

  // Peticion GET
  const getUsers = async () => {
    try {
      const response = await instance.get("/usuarios");
      return setData(response.data);
    } catch (err) {
      setData([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full p-3">
      <ToastContainer />
      <button className="btn mb-3" onClick={handleOpenModal}>
        Agregar usuario
      </button>

      <ModalAggCuenta
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        getUsers={getUsers}
      />

      <div className="p-3 bg-white rounded-lg drop-shadow-3xl">
        <TableCuentas
          data={data}
          getUsers={getUsers}
          modalOpen={modalOpen}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Cuentas;
