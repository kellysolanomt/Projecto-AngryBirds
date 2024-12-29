import { Constraint, World, Bodies } from "matter-js";

function SlingShot(world, bird, x, y, leftArmX, leftArmY, rightArmX, rightArmY, ground, slingPoleTexture) {
    // const slingShot = Constraint.create({
    //     pointA: { x: x, y: y },
    //     bodyB: bird,
    //     pointB: { x: 0, y: 0 },
    //     stiffness: 0.01,
    //     length: 10,
    //     render: {
    //         lineWidth: 5,
    //         strokeStyle: '#000', 
            
    //     }
    // });

    const slingLeft = Constraint.create({
        pointA: { x: leftArmX, y: leftArmY }, 
        bodyB: bird,
        pointB: { x: 0, y: 0 }, 
        stiffness: 0.01,
        length: 8,
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
        length: 8,
        render: {
            type: 'line',
            strokeStyle: '#120E0A', 
            lineWidth: 8,
        }
    });


    const slingPole = Bodies.rectangle(x, ground-(510/4.2), 25, 200, {
        isStatic: true,
        render: {
            sprite: {
                texture: slingPoleTexture, // Textura del palo
                xScale: 0.5,
                yScale: 0.5
            }
        }
    });

    const slingCenter = Constraint.create({
        pointA: { x: x, y: y }, // Centro de la resortera
        bodyB: bird,
        // pointB: { x: 0, y: 0 }, // Centro del pájaro
        stiffness: 0.05,
        length: 10,
        render: {
            strokeStyle: '#000',
            lineWidth: 3
        }
    });
    World.add(world, [slingLeft, slingRight, slingPole]);
    return {slingLeft, slingRight, slingPole};
    // World.add(world, slingCenter);
    

}

export default SlingShot;