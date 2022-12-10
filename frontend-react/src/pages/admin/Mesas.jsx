import { useState, useEffect } from "react";
import { instance } from "../../api/api";
import { GiKnifeFork } from "react-icons/gi";
import { ModalAggMesa } from "../../components";
import Swal from "sweetalert2";

const Mesas = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
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
      <div className="mt-3">
        <button
          aria-controls="modal-addMesa"
          className={`btn ${modalOpen && "bg-slate-200"}`}
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
        >
          Agregar mesa
        </button>
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {mesas.map((item) => (
            <div key={item.id} className="card-producto">
              {/* Numero de la mesa */}
              <div className="flex justify-end">
                <p className="border-2 border-azul-marino bg-azul-marino/20 font-medium rounded-full px-4 py-1 m-1">
                  {item.estado}
                </p>
              </div>

              {/* Cuerpo carta */}
              <div className="flex justify-center items-center ">
                <div className="border-2 border-black w-max p-7 rounded-full">
                  <GiKnifeFork size={40} />
                </div>
              </div>

              <div className="flex justify-center my-5">
                <p className="border-2 border-azul-marino bg-azul-marino/20 font-medium rounded-full px-4 py-1 m-1">
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
          ))}
        </div>
      </div>
      <ModalAggMesa
        id="modal-addMesa"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getMesas={getMesas}
      />
    </div>
  );
};

export default Mesas;
