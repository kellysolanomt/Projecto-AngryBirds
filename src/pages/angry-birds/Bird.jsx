import { Bodies, World } from 'matter-js';

function Bird(world, x, y, radius, birdTexture) {
  const bird = Bodies.circle(x, y, radius, {
    isStatic: false,
    density: 0.05,   
    restitution: 0.6, 
    friction: 0.5,   
    frictionAir: 0.01, 
    render: {
        sprite: {
            texture: birdTexture,
            xScale: radius/250,
            yScale: radius/250
        }
    }
  });
  
  return bird;
}
export default Bird;