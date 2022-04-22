import React from "react";
import "./index.css";

function Modal({ children, isOpen, toggleModal, type, onCancel, onConfirm }) {
  return (
    <div>
      <div className={`modal-overlay ${isOpen ? "active" : ""}`}>
        <div
          className={`modal  ${isOpen ? "active" : ""}  ${
            type === "alert" ? "" : "full_modal"
          }`}
        >
          {type !== "alert" && (
            <button className="close-modal" href="#" onClick={toggleModal}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}

          <div className="modal-content">
            {children}
            {type === "alert" && (
              <div className="alert_body">
                <button onClick={onCancel} className="cancel_button">
                  Cancel
                </button>
                <button className="confirm_button" onClick={onConfirm}>
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
