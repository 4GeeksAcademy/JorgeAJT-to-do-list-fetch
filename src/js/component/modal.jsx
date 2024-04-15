import React  from "react";

const Modal = ( {onClose, message, faceIcon} ) => {
  return (
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body d-flex">
              <p className="modal-message" style={{ fontSize: '20px' }}>{message}</p>
              <i class={faceIcon}></i> 
            </div>
          </div>
        </div>
      </div>
    )
}

export default Modal
