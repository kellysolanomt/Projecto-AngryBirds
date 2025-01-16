import React, { useEffect, useRef, useState } from "react";
import { Engine, Render, World, Runner, Mouse, MouseConstraint, Events, use } from "matter-js";
import Ground from './Ground';
import Bird from './Bird';
import SlingShot from './SlingShot';
import PigCastle from "./PigCastle";
import { handlePigCollisions } from './handlePigCollisions';
import "../../styles/Main.css"

function Main() {

    const sceneRef = useRef(null);
    const pajaroLanzadoRef = useRef(false);
    const currentEngine = useRef(null);
    const currentWorld = useRef(null);
    const currentRunner = useRef(null);
    const posBirdX = useRef(null);
    const posBirdY = useRef(null);
    const RefbirdRadius = useRef(null);
    const RefbirdTexture = useRef(null);
    const RefleftArmX = useRef(null);
    const RefleftArmY = useRef(null);
    const RefrightArmX = useRef(null);
    const RefrightArmY = useRef(null);
    const RefcenterX = useRef(null);
    const Refground = useRef(null);
    const RefslingPoleTexture = useRef(null);
    const RefgroundTexture = useRef(null);
    const Refrender = useRef(null);



    useEffect(() => {
        const engine = Engine.create();
        currentEngine.current = engine;
        const runner = Runner.create();
        currentRunner.current = runner;
        const world = engine.world;
        currentWorld.current = world;
        let render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: "transparent"
            }
        });

        Refrender.current = render;
        Render.run(render);
        Runner.run(runner, engine);
        const groundTexture = './piso.jpg';
        const birdTexture = './pajaro.png';
        const slingPoleTexture = './resortera.png';
        let ground = Ground(world, window.innerWidth, window.innerHeight, groundTexture);

        RefslingPoleTexture.current = slingPoleTexture;
        RefbirdTexture.current = birdTexture;
        Refground.current = ground;
        RefgroundTexture.current = groundTexture;

        const birdX = window.innerWidth / 4;
        posBirdX.current = birdX;
        const birdY = window.innerHeight - (innerHeight - ground + 510 * 0.36);
        posBirdY.current = birdY;
        const birdRadius = 25;
        RefbirdRadius.current = birdRadius;
        const leftArmX = birdX - 25;   // Ajustar el desplazamiento respecto al pájaro
        RefleftArmX.current = leftArmX;
        const rightArmX = birdX + 24;  // Ajustar el desplazamiento respecto al pájaro
        RefrightArmX.current = rightArmX;
        const centerX = birdX;
        const leftArmY = birdY;
        RefleftArmY.current = leftArmY;
        const rightArmY = birdY;
        RefrightArmY.current = rightArmY;


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

        const engine = currentEngine.current;
        const world = currentWorld.current;
        const runner = currentRunner.current;

        if (!engine || !world || !runner) {
            console.error("Motor o mundo no están inicializados.");
            return;
        }

        Runner.stop(runner);
        Engine.clear(engine);
        World.clear(world, false);

        pajaroLanzadoRef.current = false;

        const ground = Ground(world, window.innerWidth, window.innerHeight, RefgroundTexture.current);

        const bird = Bird(world, posBirdX.current, posBirdY.current, RefbirdRadius.current, RefbirdTexture.current);

        World.add(world, bird);

        let { slingLeft, slingRight, slingPole } = SlingShot(world, bird, posBirdX.current, posBirdY.current, RefleftArmX.current, RefleftArmY.current, RefrightArmX.current, RefrightArmY.current, ground, RefslingPoleTexture.current);

        PigCastle(world);

        let mouse = Mouse.create(Refrender.canvas);
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
                slingRight.pointB = { x: RefcenterX, y: RefrightArmY };
                slingLeft.pointB = { x: RefcenterX, y: RefleftArmY };

                World.remove(world, mouseContraint);
            }, 100);

        });

        Runner.run(runner, engine);

    };

    // const reiniciar = () => {
    //     window.location.reload();
    // }

    

    return (
        // <div style={
        //     {
        //         overflow: 'hidden',
        //         margin: 0,
        //         backgroundImage: 'url("cielo.jpg")',
        //         backgroundSize: "cover",
        //     }
        // }>
        <div className="container">
            <div className="btn-group">
                <button className="btn" onClick={reiniciar}>Reiniciar</button>
            </div>

            <div ref={sceneRef}></div>
        </div>
    );
}

export default Main;