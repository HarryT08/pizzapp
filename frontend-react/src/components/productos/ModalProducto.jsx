import { Modal, Fade } from '@mui/material';
import { Tap } from '@/components';

const ModalProducto = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <div className="modal">
            <Tap onClose={onClose} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalProducto;
