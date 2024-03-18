import React from 'react'
import "../Login/Logout.scss"
export default function Logout({ isOpen, onCancel, onConfirm }) {
  return (
    <>
     <div className={`logout-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>Are you sure you want to logout?</p>
        <div className="button-container">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Logout</button>
        </div>
      </div>
    </div>
    </>
  )
}
