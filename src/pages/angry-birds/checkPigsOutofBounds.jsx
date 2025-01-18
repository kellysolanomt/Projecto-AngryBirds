import { World } from "matter-js";

export function checkPigsOutOfBounds(world, setPigsEliminated, isBirdLaunched) {
  if (isBirdLaunched === false) {
    return;
  }

  const pigs = world.bodies.filter((body) => body.label === "Pig");

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
