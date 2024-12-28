import { Constraint, World } from "matter-js";

function SlingShot(world, bird, x, y) {
    const slingShot = Constraint.create({
        pointA: { x: x, y: y },
        bodyB: bird,
        stiffness: 0.05,
        length: 10,
    });
    World.add(world, slingShot);

}

export default SlingShot;