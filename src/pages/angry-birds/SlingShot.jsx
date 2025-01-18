import { Constraint, World, Bodies } from "matter-js";

function SlingShot(world, bird, x, y, leftArmX, leftArmY, rightArmX, rightArmY, ground, slingPoleTexture) {

    const slingLeft = Constraint.create({
        pointA: { x: leftArmX, y: leftArmY }, 
        bodyB: bird,
        pointB: { x: 0, y: 0 }, 
        stiffness: 0.01,
        length: 10,
        render: {
            type: 'line',
            strokeStyle: '#120E0A', 
            lineWidth: 8,
        }
    });
    
    const slingRight = Constraint.create({
        pointA: { x: rightArmX, y: rightArmY }, 
        bodyB: bird,
        pointB: { x: 0, y: 0 }, 
        stiffness: 0.01,
        length: 10,
        render: {
            type: 'line',
            strokeStyle: '#120E0A', 
            lineWidth: 8,
        }
    });


    const slingPole = Bodies.rectangle(x, ground-(460/4.2), 25, 200, {
        isStatic: true,
        render: {
            sprite: {
                texture: slingPoleTexture, 
                xScale: 0.45,
                yScale: 0.45
            }
        }
    });

    World.add(world, [slingLeft, slingRight, slingPole]);
    return {slingLeft, slingRight, slingPole};

}

export default SlingShot;