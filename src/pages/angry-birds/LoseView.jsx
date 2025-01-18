import React from "react";
import "../../styles/LoseView.css";

const LoseView = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h1>¡Perdiste!</h1>
        <p>Lo siento, has perdido el juego</p>
      </div>
    </div>
  );
};

export default LoseView;
