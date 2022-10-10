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
        <button className='btn' onClick={handleOpen}>
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
                <p className="font-bold text-lg">Agregar empleado</p>
                <IoMdClose className="btn-close" onClick={handleClose}/>
              </div>
              <div id="transition-modal-description">
                <div className="flex flex-col mt-3">
                  <label className="font-semibold text-lg">Nombre</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label className="font-semibold text-lg">Cargo</label>
                  <input
                    type="text"
                    className="border-2 p-1 bg-white rounded-lg border-azul-marino/60 focus-within:border-azul-marino focus:outline-none"
                  />
                </div>
                <div className="mt-3">
                  <button className="btn" onClick={handleClose}>Agregar</button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
    </div>
    </>
  )
}

export default ModalUsuarios