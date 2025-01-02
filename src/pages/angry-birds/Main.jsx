import React, {useEffect, useRef} from "react";
import {Engine, Render, World, Runner, Mouse, MouseConstraint, Events} from "matter-js";
import Ground from './Ground';  
import Bird from './Bird';
import SlingShot from './SlingShot';
import PigCastle from "./PigCastle";

function Main() {

    const sceneRef = useRef(null);
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
        
        const birdX = 400;
        const birdY = 650;
        const birdRadius = 25;
        const leftArmX = birdX - 25;   // Ajustar el desplazamiento respecto al pájaro
        const rightArmX = birdX + 24;  // Ajustar el desplazamiento respecto al pájaro
        const centerX = birdX;  // El centro de la resortera debe coincidir con el pájaro
        const leftArmY = birdY;
        const rightArmY = birdY;

        let bird = Bird(world, birdX, birdY, birdRadius, birdTexture);
        let {slingLeft, slingRight, slingPole} = SlingShot(world, bird, birdX, birdY, leftArmX, leftArmY, rightArmX, rightArmY, ground, slingPoleTexture);
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

        Events.on(mouseContraint, 'mouseup', ()=> {
            setTimeout(() => {
                slingLeft.bodyB = null;
                slingRight.bodyB = null;
                slingRight.pointB = {x: centerX, y: rightArmY};
                slingLeft.pointB = {x: centerX, y: leftArmY};
            }, 100);
        });
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        }

    }, []);

    return (
        <div style={
            {   overflow: 'hidden', 
                margin: 0,
                backgroundImage:'url("cielo.jpg")',
                backgroundSize: "cover",
            }
            }>
            <div ref={sceneRef}></div>
        </div>
    );
}

export default Main;