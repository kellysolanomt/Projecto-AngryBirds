import { Bodies, World } from "matter-js";
const Ground = (world, width, height, groundTexture) => {
    const tileWidth = 50;
    const tileHeight = 50;
    const numberOfTiles = Math.ceil(width / tileWidth);

    // console.log(world, width, height, texture);
    
    for (let row = 0; row < 3; row++){
        for(let i=0;i<numberOfTiles;i++){
            const bloquePiso = Bodies.rectangle(
                i*tileWidth + tileWidth/2,
                height - tileWidth/2 - (row*tileHeight),
                tileWidth,
                tileHeight,
                {
                    isStatic: true,
                    render: {
                        sprite:{
                            texture: groundTexture,
                            xScale:tileWidth/1024,
                            yScale:tileHeight/1024,
                        }
                    }

                }

            );
            World.add(world, bloquePiso);
        }
    }

    return window.innerHeight - tileHeight*3;
    

}

export default Ground;