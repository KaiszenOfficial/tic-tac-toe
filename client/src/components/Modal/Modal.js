import React from "react";
import "./Modal.css";

export default function Modal({ handleSave, handleClose, show, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="btn-group">
          <button type="button" style={{ marginRight: "1rem" }} onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
