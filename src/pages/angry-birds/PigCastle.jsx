import React from "react";
import { Bodies, World } from "matter-js"; 

function PigCastle(world) {
	const madera_h = './wood-h.png';
	const madera_v = './wood-v.png';
	const madera_b = './wood-b.png';
	const cerdo = './cerdo.png';
	const radioCerdo = 25;
	const crearBloque = (x,y, width, height, texture, xScale, yScale) => {
		return Bodies.rectangle(x,y,width,height, {
			isStatic: false,
			density: 0.04,
			restitution: 0.8,
			friction: 0.5,
			render: {
				sprite: {
					texture: texture,
					xScale: xScale,
					yScale: yScale
				}
			}
		});
	}

	const crearCerdo = (x,y, radio) => {
		return Bodies.circle(x,y,radio, {
			isStatic: false,
			density: 0.04,
			restitution: 0.8,
			friction: 0.5,
			render: {
				sprite: {
					texture: cerdo,
					xScale: 0.1,
					yScale: 0.1
				}
			}
		});
	}

	const blocks = [
        crearBloque(1000, window.innerHeight - 160, 200, 20, madera_h, 0.24, 0.2),
        crearBloque(1210, window.innerHeight - 160, 200, 20, madera_h, 0.24, 0.2),
        crearBloque(1000, window.innerHeight - 270, 20, 200, madera_v, 0.2, 0.24),
        crearBloque(1210, window.innerHeight - 270, 20, 200, madera_v, 0.2, 0.24),
        crearBloque(1105, window.innerHeight - 380, 300, 20, madera_h, 0.3, 0.2),
        crearBloque(1050, window.innerHeight - 440, 20, 100, madera_v, 0.2, 0.12),
        crearBloque(1150, window.innerHeight - 440, 20, 100, madera_v, 0.2, 0.12),
        crearBloque(1100, window.innerHeight - 500, 200, 20, madera_h, 0.2, 0.2),
        crearBloque(1050, window.innerHeight - 195, 50, 50, madera_b, 0.16, 0.16),
        crearBloque(1150, window.innerHeight - 195, 50, 50, madera_b, 0.16, 0.16),
        crearBloque(1100, window.innerHeight - 230, 100, 20, madera_h, 0.15, 0.2),
    ];

	const pigs = [
        crearCerdo(1100, window.innerHeight - 265, radioCerdo),
        crearCerdo(1100, window.innerHeight - 425, radioCerdo),
        crearCerdo(1100, window.innerHeight - 540, radioCerdo),
    ]

	World.add(world, pigs);
	World.add(world, blocks);
	
}


export default PigCastle;