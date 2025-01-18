import React from "react";
import "../../styles/WinView.css";

const WinView = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>¡Felicidades!</h1>
        <img className="image" src="./win.webp" alt="Win Img"/>
        <p>Has ganado el juego</p>
        <button className="button" onClick={onClose}>¿De nuevo?</button>
      </div>
    </div>
  );
};

export default WinView;
