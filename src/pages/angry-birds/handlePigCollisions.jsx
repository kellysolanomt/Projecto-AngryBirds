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
  // Solo procesar si el pájaro ya fue lanzado
  if (!isBirdLaunched()) {
    return; // Si el pájaro no ha sido lanzado, no hacemos nada.
  }

  if (pig.is_remove) {
    return; // Si el cerdo ya fue eliminado, no hacemos nada.
  }

  const totalPigs = world.bodies.filter((body) => body.label === "Pig").length;

  // Calcular la velocidad relativa de los cuerpos en colisión
  const impactVelocity = Math.sqrt(
    Math.pow(pair.bodyA.velocity.x - pair.bodyB.velocity.x, 2) +
      Math.pow(pair.bodyA.velocity.y - pair.bodyB.velocity.y, 2)
  );

  // Definir un umbral mínimo para que el impacto cause daño
  const IMPACT_THRESHOLD = 3; // Ajustar según lo necesario
  if (impactVelocity > IMPACT_THRESHOLD) {
    // Reducir la vida del cerdo basado en la fuerza del impacto
    pig.life -= impactVelocity * 3; // Ajustar el multiplicador para balancear el daño
    console.log(`Cerdo fue golpeado, vida restante: ${pig.life}`);

    // Eliminar el cerdo si su vida llega a 0
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
