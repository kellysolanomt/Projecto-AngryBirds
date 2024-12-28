import React, {useEffect, useRef} from "react";
import {Engine, Render, World, Runner, Mouse, MouseConstraint, Events} from "matter-js";
import Ground from './Ground';  
import Bird from './Bird';


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
        Ground(world, window.innerWidth, window.innerHeight, groundTexture);
        let bird = Bird(world, 200, 500, 25, birdTexture);
        let mouse = Mouse.create(render.canvas);
        let mouseContraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.05,
                render: {
                    visible: false,
                }
            }
        });
        World.add(world, mouseContraint);
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