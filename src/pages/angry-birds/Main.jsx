import React, { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  World,
  Runner,
  Mouse,
  MouseConstraint,
  Events,
  Composite,
  use,
} from "matter-js";
import Ground from "./Ground";
import Bird from "./Bird";
import SlingShot from "./SlingShot";
import PigCastle from "./PigCastle";
import { handlePigCollisions } from "./handlePigCollisions";
import { checkPigsOutOfBounds } from "./checkPigsOutofBounds";
import "../../styles/Main.css";
import WinView from "./WinView";
import LoseView from "./LoseView";

function Main() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const renderRef = useRef(null);
  const birdRef = useRef(null);
  const slingshotRef = useRef({ slingLeft: null, slingRight: null });
  const groundRef = useRef(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const pajaroLanzadoRef = useRef(false);
  const [pigsEliminated, setPigsEliminated] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  useEffect(() => {
    console.log("Pigs eliminated: ", pigsEliminated);
    const timeout = setTimeout(() => {
      if (pigsEliminated === 3) {
        handleWin();
      } else if (attemptsLeft === 0) {
        handleLose();
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [pigsEliminated, attemptsLeft]);


  useEffect(() => {
    const engine = Engine.create();
    const runner = Runner.create();
    engineRef.current = engine;
    runnerRef.current = runner;

    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    renderRef.current = render;

    Render.run(render);
    Runner.run(runner, engine);

    // Configuración inicial
    const groundTexture = "./piso.jpg";
    const birdTexture = "./pajaro.png";
    const slingPoleTexture = "./resortera.png";

    const ground = Ground(
      world,
      window.innerWidth,
      window.innerHeight,
      groundTexture
    );
    groundRef.current = ground;
    const birdRadius = 25;

    const birdX = window.innerWidth / 4;
    const birdY = window.innerHeight - (innerHeight - ground + 510 * 0.36);
    const leftArmX = birdX - 25;
    const rightArmX = birdX + 24;
    const leftArmY = birdY;
    const rightArmY = birdY;
    const centerX = birdX;

    const bird = Bird(world, birdX, birdY, birdRadius, birdTexture);
    birdRef.current = bird;

    const { slingLeft, slingRight, slingPole } = SlingShot(
      world,
      bird,
      birdX,
      birdY,
      leftArmX,
      leftArmY,
      rightArmX,
      rightArmY,
      ground,
      slingPoleTexture
    );
    slingshotRef.current = { slingLeft, slingRight };
    World.add(world, bird);

    PigCastle(world);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.07,
        render: { visible: false },
      },
      collisionFilter: {
        category: 0x0008,
        mask: 0x0002 | 0x0004, 
      }
    });
    World.add(world, mouseConstraint);

    Events.on(mouseConstraint, "mouseup", () => {
      if (!pajaroLanzadoRef.current) {
        pajaroLanzadoRef.current = true;
        setTimeout(() => {
          slingshotRef.current.slingLeft.bodyB = null;
          slingshotRef.current.slingRight.bodyB = null;
          slingshotRef.current.slingLeft.pointB = { x: centerX, y: leftArmY };
          slingshotRef.current.slingRight.pointB = { x: centerX, y: rightArmY };


          setAttemptsLeft((prevAttempts) => {
            if (prevAttempts > 0) {
              return prevAttempts - 1;
            }
            return prevAttempts;
          });
        }, 100);
      }
    });

    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        const pig = [bodyA, bodyB].find((body) => body.label === "Pig");
        if (pig) {
          handlePigCollisions(
            pig,
            pair,
            world,
            () => pajaroLanzadoRef.current,
            pigsEliminated,
            setPigsEliminated
          );
        }
      });
    });

    Events.on(engine, "beforeUpdate", () => {

      const allBodies = Composite.allBodies(engine.world);
      allBodies.forEach((body) => {
        if (body.lifetime !== undefined) {
          body.lifetime -= 8;
          if (body.lifetime <= 0) {
            console.log(`Eliminando objeto: ${body.label}`);
            World.remove(world, body);
          }
        }
      });
    });

    return () => {
      Events.off(engine, "collisionStart");
      Events.off(engine, "beforeUpdate");
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  /* Quito este useEffect porque afecta el lanzamiento del pájaro */ 
  // useEffect(() => {

  //   if (!engineRef.current) {
  //     return;
  //   }
  //   const update = () => {
  //     Engine.update(engineRef.current, 1000 / 60);
  //     if (pajaroLanzadoRef.current) {
  //       checkPigsOutOfBounds(engineRef.current.world, setPigsEliminated, pajaroLanzadoRef.current);
  //     }
  //     requestAnimationFrame(update);
  //   };
  //   requestAnimationFrame(update);
  //   return () => cancelAnimationFrame(update);
  // }, [pajaroLanzadoRef]);


  const launchNextBird = () => {
    if (attemptsLeft > 0 && pajaroLanzadoRef.current === true) {
      const world = engineRef.current.world;
      const birdRadius = 25;
      const birdX = window.innerWidth / 4;
      const birdY =
        window.innerHeight - (innerHeight - groundRef.current + 510 * 0.36);

      const newBird = Bird(world, birdX, birdY, birdRadius, "./pajaro.png");
      birdRef.current = newBird;

      slingshotRef.current.slingLeft.pointB = { x: 0, y: 0 };
      slingshotRef.current.slingRight.pointB = { x: 0, y: 0 };

      slingshotRef.current.slingLeft.bodyB = newBird;
      slingshotRef.current.slingRight.bodyB = newBird;
      World.add(world, newBird);

      pajaroLanzadoRef.current = false;
    } else if (attemptsLeft === 0) {
      console.log("No quedan más intentos.");
    } else {
      console.log("Aún no has lanzado el pájaro actual.");
    }
  };

  const reiniciar = () => {
    const engine = engineRef.current;
    const runner = runnerRef.current;

    if (!engine || !runner) {
      console.error("Motor o mundo no están inicializados.");
      return;
    }

    // Detenemos y limpiamos el motor
    Runner.stop(runner);
    World.clear(engine.world, true); // Limpia todos los cuerpos y restricciones
    Engine.clear(engine);

    // Reiniciamos las referencias globales
    pajaroLanzadoRef.current = false;
    setAttemptsLeft(3);
    setPigsEliminated(0);
    setTimeElapsed(0);
    setShowWinModal(false);
    setShowLoseModal(false);
    // Configuramos el mundo nuevamente
    const world = engine.world;

    const render = renderRef.current;
    render.canvas
      .getContext("2d")
      .clearRect(0, 0, render.canvas.width, render.canvas.height);

    const groundTexture = "./piso.jpg";
    const birdTexture = "./pajaro.png";
    const slingPoleTexture = "./resortera.png";

    const ground = Ground(
      world,
      window.innerWidth,
      window.innerHeight,
      groundTexture
    );
    groundRef.current = ground;

    const birdRadius = 25;
    const birdX = window.innerWidth / 4;
    const birdY = window.innerHeight - (innerHeight - ground + 510 * 0.36);

    const bird = Bird(world, birdX, birdY, birdRadius, birdTexture);
    birdRef.current = bird;

    const leftArmX = birdX - 25;
    const rightArmX = birdX + 24;
    const leftArmY = birdY;
    const rightArmY = birdY;
    const centerX = birdX;

    const { slingLeft, slingRight, slingPole } = SlingShot(
      world,
      bird,
      birdX,
      birdY,
      leftArmX,
      leftArmY,
      rightArmX,
      rightArmY,
      ground,
      slingPoleTexture
    );
    slingshotRef.current = { slingLeft, slingRight };
    World.add(world, bird);

    PigCastle(world);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.07,
        render: { visible: false },
      },
      collisionFilter: {
        category: 0x0008,
        mask: 0x0002 | 0x0004, 
    }
    });
    World.add(world, mouseConstraint);

    Events.on(mouseConstraint, "mouseup", () => {
      pajaroLanzadoRef.current = true;
      setTimeout(() => {
        slingshotRef.current.slingLeft.bodyB = null;
        slingshotRef.current.slingRight.bodyB = null;
        slingshotRef.current.slingLeft.pointB = { x: centerX, y: leftArmY };
        slingshotRef.current.slingRight.pointB = { x: centerX, y: rightArmY };
      }, 100);
    });

    Runner.run(runner, engine);
    Render.run(render);
  };

  const handleWin = () => {
    setShowWinModal(true);
    setTimerActive(false);
  };

  const handleLose = () => {
    setShowLoseModal(true);
    setTimerActive(false);
  };

  const closeModal = () => {
    setShowWinModal(false);
    setShowLoseModal(false);
    setTimerActive(true);
    reiniciar();
  };

  return (
    <div className="container">
      <div className="btn-group">
        <button className="btn-reiniciar" onClick={reiniciar}></button>
        <button className="btn-siguientePajaro" onClick={launchNextBird}>
          Lanzar siguiente pájaro
        </button>
        <div className="time">
          <h3>Tiempo transcurrido: {timeElapsed} segundos</h3>
        </div>
      </div>
      <div className="container-birds">
        <div className="birds-container">
          <h3>Intentos restantes: {attemptsLeft}</h3>
          <div className="birds">
            {Array.from({ length: attemptsLeft }).map((_, index) => (
              <img
                key={index}
                src="./pajaro.png"
                alt="Pájaro rojo"
                className="bird-image"
              />
            ))}
          </div>
        </div>
      </div>
      <div ref={sceneRef}></div>

      {showWinModal && <WinView onClose={closeModal} />}
      {showLoseModal && <LoseView onClose={closeModal} />}
    </div>
  );
}

export default Main;
