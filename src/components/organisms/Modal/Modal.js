import React from 'react';
import Modal from 'react-modal';
import { CloseIcon, customStyles } from './Modal.styles';

Modal.setAppElement(document.getElementById('modal-container'));

const MyModal = ({ closeModal, modalIsOpen, children }) => {
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <CloseIcon onClick={closeModal} />
        {children}
      </Modal>
    </div>
  );
};

export default MyModal;
