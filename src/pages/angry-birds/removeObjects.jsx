import { Events, World } from 'matter-js';

function removeObjects(world, windowWidth, windowHeight) {
    const bodies = World.getAllBodies(world);

    bodies.forEach(body => {
        if (
            body.position.x > windowHeight || body.position.x < 0 || body.position.y > windowWidth || body.position.y < 0) {
            World.remove(world, body);
        }
    });
}

export default removeObjects;