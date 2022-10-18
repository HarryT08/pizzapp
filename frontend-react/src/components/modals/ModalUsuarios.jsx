import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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

const ModalUsuarios = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <button className="btn" onClick={handleOpen}>
          Agregar empleado
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div id="transition-modal-title" className="header-modal">
                <p className="font-bold text-lg md:text-base">Agregar empleado</p>
                <IoMdClose className="btn-close" onClick={handleClose} />
              </div>
              <div id="transition-modal-description" className="grid grid-cols-2 gap-4">
                <div className="flex flex-col mt-2">
                  <label className="font-semibold text-lg md:text-base">Nombre</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="font-semibold text-lg md:text-base">Apellido</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="font-semibold text-lg md:text-base">Cargo</label>
                  <select name="" id="" className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none">
                    <option value="All" className="text-black bg-white">
                      Selecciona el cargo
                    </option>
                    <option value="1" className="text-black bg-white">
                      Mesero
                    </option>
                    <option value="2" className="text-black bg-white">
                      Admin
                    </option>
                  </select>
                </div>
                <div className="flex flex-col mt-2">
                <label className="font-semibold text-lg md:text-base">Contraseña</label>
                  <input
                    type="password"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                <label className="font-semibold text-lg md:text-base">Usuario</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                <label className="font-semibold text-lg md:text-base">Cedula</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                <label className="font-semibold text-lg md:text-base">Telefono</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
              </div>
                <div className="mt-3">
                  <button className="btn" onClick={handleClose}>
                    Agregar
                  </button>
                </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default ModalUsuarios;
