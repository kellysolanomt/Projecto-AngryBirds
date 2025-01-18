import { World } from "matter-js";

export function checkPigsOutOfBounds(world, setPigsEliminated, isBirdLaunched) {
  // Solo verificar los cerdos si el pájaro ha sido lanzado
  if (!isBirdLaunched()) {
    return;
  }

  // Obtener todos los cerdos
  const pigs = world.bodies.filter((body) => body.label === "Pig");

  // Verificar si cada cerdo está fuera de los límites
  pigs.forEach((pig) => {
    if (
      pig.position.x < 0 ||
      pig.position.x > window.innerWidth ||
      pig.position.y < 0 ||
      pig.position.y > window.innerHeight
    ) {
      console.log("Cerdo eliminado del mundo (fuera de los límites)");
      World.remove(world, pig);
      console.log("Cerdo eliminado del mundo (fuera de los límites)");
      setPigsEliminated((prev) => prev + 1);
    }
  });
}
