import { Bodies, World } from 'matter-js';

function Bird(world, x, y, radius, birdTexture) {
  const bird = Bodies.circle(x, y, radius, {
    isStatic: false,
    density: 0.03,   // Reduce ligeramente la densidad
    restitution: 0.6, // Reduce el rebote
    friction: 0.3,   // Ajusta la fricción para suavizar interacciones
    frictionAir: 0.01, // Agrega fricción del aire para amortiguar oscilaciones
    render: {
        sprite: {
            texture: birdTexture,
            xScale: radius/250,
            yScale: radius/250
        }
    }
  })
  World.add(world, bird);
  return bird;
}
export default Bird;