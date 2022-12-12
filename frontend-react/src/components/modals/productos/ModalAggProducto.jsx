import { Modal, Fade } from "@mui/material";
import { Tap } from "../..";

const ModalAggProducto = ({
    modalOpen,
    getProductos,
    handleCloseModal,
}) => {

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
            >
                <Fade in={modalOpen}>
                    <div className="modal">
                        <Tap handleCloseModal={handleCloseModal} getProductos={getProductos} />
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalAggProducto;
