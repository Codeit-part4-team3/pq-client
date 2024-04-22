import ReactDOM from 'react-dom';
import Modal from './modal';
import React from 'react';

interface CreateModalProps {
  children: React.ReactElement;
  onClose?: () => void;
}

const createModal = ({ children, onClose }: CreateModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('Cannot find modal root');
    return;
  }

  const modalElement = document.createElement('div');
  modalRoot.appendChild(modalElement);

  const closeModal = () => {
    ReactDOM.unmountComponentAtNode(modalElement);
    modalRoot.removeChild(modalElement);
    onClose && onClose();
  };

  ReactDOM.render(
    <React.StrictMode>
      {ReactDOM.createPortal(
        <Modal isOpen={true} onClose={closeModal}>
          {children}
        </Modal>,
        modalElement,
      )}
    </React.StrictMode>,
    modalElement,
  );
};

export default createModal;
