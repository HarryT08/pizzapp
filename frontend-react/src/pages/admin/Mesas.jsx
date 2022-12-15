import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import { GiKnifeFork } from "react-icons/gi";
import { ModalAggMesa } from "../../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const Mesas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [mesas, setMesas] = useState([]);

  const getMesas = async () => {
    try {
      const response = await instance.get("/mesas");
      setMesas(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMesas();
  }, []);

  const deleteMesa = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete(`/mesas/${id}`)
          .then((res) => {
            getMesas();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="mt-3">
        <button className="btn" onClick={handleOpenModal}>
          Agregar mesa
        </button>
      </div>
      {
        // Mensajes por si no hay mesas
        mesas.length === 0 ? (
          <Alert severity="error"><strong>No hay mesas para editar</strong></Alert>
        ) : (
          <div className="mt-3">
            <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
              {mesas.map((item) => {
                const colorEstado = item.estado === "Disponible" ? "[#008000]" : "rojo-fuerte";
                return (
                  <div key={item.id} className="card-producto">
                    {/* Numero de la mesa */}
                    <div className="flex justify-end mt-2">
                      <p className={`bg-${colorEstado}/20 text-${colorEstado} font-medium rounded-full px-4 py-1 m-1`}>
                        {item.estado}
                      </p>
                    </div>
  
                    {/* Cuerpo carta */}
                    <div className="flex justify-center items-center ">
                      <div className="border-2 border-black w-max p-7 rounded-full">
                        <GiKnifeFork size={40} />
                      </div>
                    </div>
  
                    <div className="flex justify-center my-3">
                      <p className="bg-azul-marino/20 text-azul-marino font-medium rounded-full px-4 py-1 m-1">
                        Mesa {item.id}
                      </p>
                    </div>
                    <div className="flex justify-center mb-5">
                      <button
                        className="btnCancel"
                        onClick={() => deleteMesa(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      <ModalAggMesa
        handleCloseModal={handleCloseModal}
        modalOpen={modalOpen}
        getMesas={getMesas}
      />
    </div>
  );
};

export default Mesas;
