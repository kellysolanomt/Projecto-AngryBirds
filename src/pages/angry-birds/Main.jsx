import React, { useEffect, useRef, useState } from "react";
import { Engine, Render, World, Runner, Mouse, MouseConstraint, Events } from "matter-js";
import Ground from './Ground';
import Bird from './Bird';
import SlingShot from './SlingShot';
import PigCastle from "./PigCastle";
import { handlePigCollisions } from './handlePigCollisions';
import "../../styles/Main.css";

function Main() {

    const sceneRef = useRef(null);
    const pajaroLanzadoRef = useRef(false);

    useEffect(() => {
        const engine = Engine.create();
        const runner = Runner.create();
        const world = engine.world;
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: "transparent"
            }
        });
        Render.run(render);
        Runner.run(runner, engine);
        const groundTexture = './piso.jpg';
        const birdTexture = './pajaro.png';
        const slingPoleTexture = './resortera.png';
        let ground = Ground(world, window.innerWidth, window.innerHeight, groundTexture);

        const birdX = window.innerWidth / 4;
        const birdY = window.innerHeight - (innerHeight - ground + 510 * 0.36);
        const birdRadius = 25;
        const leftArmX = birdX - 25;   // Ajustar el desplazamiento respecto al pájaro
        const rightArmX = birdX + 24;  // Ajustar el desplazamiento respecto al pájaro
        const centerX = birdX;  // El centro de la resortera debe coincidir con el pájaro
        const leftArmY = birdY;
        const rightArmY = birdY;

        let bird = Bird(world, birdX, birdY, birdRadius, birdTexture);
        World.add(world, bird);
        let { slingLeft, slingRight, slingPole } = SlingShot(world, bird, birdX, birdY, leftArmX, leftArmY, rightArmX, rightArmY, ground, slingPoleTexture);
        // World.add(world, bird);
        PigCastle(world);


        let mouse = Mouse.create(render.canvas);
        let mouseContraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.07,
                render: {
                    visible: false,
                }
            }
        });
        World.add(world, mouseContraint);


        Events.on(mouseContraint, 'mouseup', () => {
            pajaroLanzadoRef.current = true; // Actualiza la referencia inmediatamente.
            console.log('Pájaro lanzado', pajaroLanzadoRef.current);
            setTimeout(() => {
                slingLeft.bodyB = null;
                slingRight.bodyB = null;
                slingRight.pointB = { x: centerX, y: rightArmY };
                slingLeft.pointB = { x: centerX, y: leftArmY };

                World.remove(world, mouseContraint);
            }, 100);
            
        });




        //    handlePigCollisions(world, engine, pajaroLanzado);
        Events.on(engine, 'collisionStart', (event) => {
            event.pairs.forEach((pair) => {
                const { bodyA, bodyB } = pair;

                // Verificar si alguno de los cuerpos es un cerdo
                const pig = [bodyA, bodyB].find(body => body.label === 'Pig');

                if (pig) {
                    handlePigCollisions(pig, pair, world, () => pajaroLanzadoRef.current);
                }
            });
        });

        return () => {
            Events.off(engine, 'collisionStart');
            Render.stop(render);
            Runner.stop(runner);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        }

    }, []);
    
    const reiniciar = () => {
        window.location.reload();
    }

    return (
        <div className="contenedor">
            <div className="boton-reinicio">
                <button className="boton" onClick={reiniciar}>
                    🔄️ Reiniciar nivel
                </button>
            </div>
            <div ref={sceneRef}></div>
        </div>
    );
}

export default Main;