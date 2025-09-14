import React from 'react';
import "../../style/model.css";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-btn-cancel">Cancel</button>
          <button onClick={onConfirm} className="modal-btn-confirm">Delete</button>
        </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;