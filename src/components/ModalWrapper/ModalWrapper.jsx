import { useEffect } from 'react';
import CloseButton from '../CloseButton/CloseButton.jsx';
import './ModalWrapper.css';

const ModalWrapper = ({ children, onClose, isOpen }) => {
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => {
        document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);
  return (
    <div className="modal_wrapper">
      <div className="modal_wrapper-overlay" onClick={onClose} />
      <div className="modal_wrapper-container">
        <CloseButton onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
