import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Home.css';

function Home() {

  const navigate = useNavigate();

  const comenzarJuego = () => {
    navigate('/angry-birds');
  }
  return (
    <div className="home">
      <div className="header">
        <h1>Angry Birds</h1>
        <button onClick={comenzarJuego}>
          Comenzar Juego
        </button>
      </div>
      
      <div className="footer">
        <p >Hecho con ❤️ por Catalina Gómez, Ivana Pedraza y Kelly Solano</p>
      </div>
    </div>
  );
}

export default Home;