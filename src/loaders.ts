import Level from './Level.js'
import { createBackground,createSpriteLayer } from "./layers.js";
import { loadBackgroundSprites } from './sprites.js';
// import { backgrounds } from './levels/interfaces.js';

export function loadImage(url:string):Promise<HTMLImageElement>{
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            // setTimeout(resolve,2000,image); 
            resolve(image);
        });
        image.src = url;
    });
}
function createTiles(level:Level,backgrounds:[{tile:string,ranges:number[][]}]){
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1,x2,y1,y2]) => {
            for (let x = x1; x < x2;  ++x){
                for (let y = y1; y < y2; ++y){
                    level.tiles.set(x,y, {
                        name:background.tile
                    });
                }
            }
        });

    });
}


export async function loadLevel(name:string):Promise<Level>{

    return Promise.all([
        //levelspec
        fetch(`./src/levels/${name}.json`)
        .then(r => r.json()),    
        //backgroundSpriets
        loadBackgroundSprites()
    ]).then(([levelSpec,backgroundSprites]) => {
        
        const level = new Level();

        createTiles(level,levelSpec.backgrounds);
        // window.level = level;
        //create buffers for Tiles to draw as full background(this way we can just draw once) -- then every update method we just replace the tiles from buffer
        // const backgroundLayer = createBackground(levelSpec.backgrounds,backgroundSprites);
        const backgroundLayer = createBackground(level,backgroundSprites);
        const spritesLayer = createSpriteLayer(level.entites);
        
        //add methods to draw from buffer in  comp
        level.comp.layers.push(backgroundLayer);
        level.comp.layers.push(spritesLayer);
        
        // console.table(level.tiles.grid);

        return level;
    });

    // .then(json => new Promise(resolve => setTimeout(resolve,3000,json)))
    // })
}