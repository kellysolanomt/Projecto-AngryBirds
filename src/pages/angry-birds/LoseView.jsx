import React from "react";
import "../../styles/LoseView.css";

const LoseView = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>¡Perdiste!</h1>
        <img className="image" src="./lose.webp" alt="Lose Img"/>
        <p>Lo siento, has perdido el juego</p>
        <button className="button" onClick={onClose}>¿Reintentar?</button>
      </div>
    </div>
  );
};

export default LoseView;
