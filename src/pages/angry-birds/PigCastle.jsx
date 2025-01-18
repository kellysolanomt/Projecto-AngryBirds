import React from "react";
import { Bodies, World } from "matter-js";

function PigCastle(world) {
  const madera_h = "./wood-h.png";
  const madera_v = "./wood-v.png";
  const madera_b = "./wood-b.png";
  const cerdo = "./cerdo.png";
  const radioCerdo = 25;
  const createBlock = (x, y, width, height, texture, xScale, yScale) => {
    const block = Bodies.rectangle(x, y, width, height, {
      isStatic: false,
      density: 0.04,
      restitution: 0.8,
      friction: 0.5,
      frictionAir: 0.02,
      render: {
        sprite: {
          texture: texture,
          xScale: xScale,
          yScale: yScale,
        },
      },
    });

    block.lifetime = 15000;

    return block;
  };

  const createPig = (x, y, radio) => {
    const pig = Bodies.circle(x, y, radio, {
      isStatic: false,
      density: 0.04,
      restitution: 0.8,
      friction: 0.5,
      label: "Pig",
      render: {
        sprite: {
          texture: cerdo,
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });

    pig.is_remove = false;
    pig.life = 100;
    pig.lifetime = 15000; 

    return pig;
  };

  const blocks = [
    createBlock(1000, window.innerHeight - 160, 200, 20, madera_h, 0.24, 0.2),
    createBlock(1210, window.innerHeight - 160, 200, 20, madera_h, 0.24, 0.2),
    createBlock(1000, window.innerHeight - 270, 20, 200, madera_v, 0.2, 0.24),
    createBlock(1210, window.innerHeight - 270, 20, 200, madera_v, 0.2, 0.24),
    createBlock(1105, window.innerHeight - 380, 300, 20, madera_h, 0.3, 0.2),
    createBlock(1050, window.innerHeight - 440, 20, 100, madera_v, 0.2, 0.12),
    createBlock(1150, window.innerHeight - 440, 20, 100, madera_v, 0.2, 0.12),
    createBlock(1100, window.innerHeight - 500, 200, 20, madera_h, 0.2, 0.2),
    createBlock(1050, window.innerHeight - 195, 50, 50, madera_b, 0.16, 0.16),
    createBlock(1150, window.innerHeight - 195, 50, 50, madera_b, 0.16, 0.16),
    createBlock(1100, window.innerHeight - 230, 100, 20, madera_h, 0.15, 0.2),
  ];

  const pigs = [
    createPig(1100, window.innerHeight - 265, radioCerdo),
    createPig(1100, window.innerHeight - 425, radioCerdo),
    createPig(1100, window.innerHeight - 540, radioCerdo),
  ];

  World.add(world, pigs);
  World.add(world, blocks);
}

export default PigCastle;
