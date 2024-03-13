import React from 'react';
import { Portal } from 'shared/Portal/Portal';
import style from './ConfirmModal.module.css'
const ConfirmModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={style.overlay} onClick={onClose}>
        <div className={style.root} onClick={(e) => e.stopPropagation()}>
          <button className={style.closeBtn} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmModal;
