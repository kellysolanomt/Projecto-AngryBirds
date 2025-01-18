import { Events, World } from "matter-js";
import Main from "./Main";

export function handlePigCollisions(
  pig,
  pair,
  world,
  isBirdLaunched,
  pigsEliminated,
  setPigsEliminated
) {
  
  if (!isBirdLaunched()) {
    return; 
  }

  if (pig.is_remove) {
    return; 
  }

  const totalPigs = world.bodies.filter((body) => body.label === "Pig").length;


  const impactVelocity = Math.sqrt(
    Math.pow(pair.bodyA.velocity.x - pair.bodyB.velocity.x, 2) +
      Math.pow(pair.bodyA.velocity.y - pair.bodyB.velocity.y, 2)
  );

  
  const IMPACT_THRESHOLD = 3; 
  if (impactVelocity > IMPACT_THRESHOLD) {
    pig.life -= impactVelocity * 3; 
    console.log(`Cerdo fue golpeado, vida restante: ${pig.life}`);

    if (
      pig.life <= 0 ||
      pig.lifetime <= 0 ||
      pig.position.x < 0 ||
      pig.position.x > window.innerWidth ||
      pig.position.y < 0 ||
      pig.position.y > window.innerHeight
    ) {
      World.remove(world, pig);
      console.log("Cerdo eliminado del mundo");
      pig.is_remove = true;
      setPigsEliminated((prev) => prev + 1);
      
    }

  }
}
