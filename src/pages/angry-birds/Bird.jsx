import { Bodies, World } from 'matter-js';

function Bird(world, x, y, radius, birdTexture) {
  const bird = Bodies.circle(x, y, radius, {
    isStatic: false,
    density: 0.05,   // Reduce ligeramente la densidad
    restitution: 0.6, // Reduce el rebote
    friction: 0.5,   // Ajusta la fricción para suavizar interacciones
    frictionAir: 0.02, // Agrega fricción del aire para amortiguar oscilaciones
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