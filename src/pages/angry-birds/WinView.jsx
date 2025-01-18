import React from "react";
import "../../styles/WinView.css";

const WinView = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h1>¡Felicidades!</h1>
        <p>Has ganado el juego</p>
      </div>
    </div>
  );
};

export default WinView;
