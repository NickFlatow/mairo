import { SpriteSheet } from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

export function loadMarioSprite(){
    return loadImage('./src/img/sprites.png').then(image =>{
        const sprites = new SpriteSheet(image,16,16);
        console.log("image",image);
        sprites.define('idle',0,88,16,16);
        sprites.define('walk-1',16,88,16,16);
        sprites.define('walk-2',32,88,16,16);
        sprites.define('walk-3',48,88,16,16);
        return sprites;
    });
}
export function loadKoopaSprite(){
    return loadImage('./src/img/sprites.png').then(image =>{
        const sprites = new SpriteSheet(image,16,24);
        console.log("image",image);
        sprites.define('idle',0,48,sprites.width,sprites.height);
        return sprites;
    });
}
export function loadBackgroundSprites(){
    return loadImage('./src/img/tiles.png').then(image =>{
        const sprites = new SpriteSheet(image,16,16);
        console.log("image",image);
        sprites.defineTile('ground',0,0);
        sprites.defineTile('sky',10, 7);
        sprites.defineTile('brick',0,0);
        return sprites;
    });
}