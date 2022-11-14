import { useState } from "react";
import {TextField} from '@mui/material'
import { mesas } from "../data/datos";
import { GiKnifeFork } from "react-icons/gi";
import { Modal, Box } from "@mui/material";
import { BtnAgg, BtnDelete } from "../styles/Button";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Mesas = () => {
  const [mesas2, setMesas2] = useState(mesas);
  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

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
        setMesas2(mesas2.filter((mesa) => mesa.id !== id));
        Swal.fire("Eliminado", "La mesa ha sido eliminada", "success");
      }
    })
  }

  const bodyModal = (
    <Box sx={style}>
      <div className="header-modal">
        <h3 className="text-xl font-semibold">Agregar mesas</h3>
      </div>
      <form>
        <div className="my-2">
          <TextField fullWidth label='Numero de la mesa' variant="filled" type='number'/>
        </div>
        <div className="flex justify-center gap-3">
          <BtnAgg type="submit" className="btn">
            Agregar mesa
          </BtnAgg>
          <BtnDelete onClick={() => abrirCerrarModal()}>Cancelar</BtnDelete>
        </div>
      </form>
    </Box>
  );

  return (
    <div className="w-full p-3">
      <div className="mt-2">
        <BtnAgg onClick={abrirCerrarModal}>Agregar mesa</BtnAgg>
      </div>
      <div className="mt-8">
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {mesas2.map((item) => (
            <div key={item.id} className="card-producto">
              {/* Numero de la mesa */}
              <div className="flex justify-end">
                <p className="border-2 border-azul-marino bg-azul-marino/20 font-medium rounded-full px-4 py-1 m-1">
                  Mesa {item.id}
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
                  {item.valor}
                </p>
              </div>
              <div className="flex justify-center mb-5">
                <BtnDelete onClick={() => deleteMesa(item.id)}>Eliminar</BtnDelete>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={modal} onClose={abrirCerrarModal}>
        {bodyModal}
      </Modal>
    </div>
  );
};

export default Mesas;
