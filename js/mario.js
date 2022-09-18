"use strict";
/**
 * draws all the layers in the order they are pushed to the layers array
 */
//loops over all backgound layers and draws them
class Compositor {
    constructor() {
        this.layers = [];
    }
    draw(context) {
        //draws a layer on a context -- all it does
        this.layers.forEach(LayerDrawMethod => {
            LayerDrawMethod(context);
        });
    }
}
//span the height and width of canvas size defined in index.html
//x1,x2,y1,y2 is defined in levels json file -- ranges
function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}
/**
 * 1.) reates buffer for background the size of cavase
 * 2.) creates buffer for each tiled background -- right now sky and ground
 * 3.) returns buffer from 1.) to be drawn in comp
 * @param backgrounds
 * @param sprites
 * @returns fucntion to draw background layers
 */
function createBackground(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    backgrounds.forEach(background => {
        //draws on backgroundbuffer instead of directly to context(which shows on screeen)
        drawBackground(background, buffer.getContext('2d'), sprites);
    });
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            // setTimeout(resolve,2000,image); 
            resolve(image);
        });
        image.src = url;
    });
}
async function loadLevel(name) {
    return fetch(`./src/levels/${name}.json`)
        .then(r => r.json());
    // .then(json => new Promise(resolve => setTimeout(resolve,3000,json)))
    // })
}
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 500; i++) {
            sprite.draw('idle', context, pos.x + i * 16, pos.y);
        }
    };
}
//load level and sprites in parallel -- do not wait for backgroundsprites to finish before starting loadlevel
//but do not continue until all have finished loading
Promise.all([
    loadKoopaSprite(),
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([koopaSprite, marioSprite, backgroundSpriteTiles, level]) => {
    const pos = {
        x: -8000,
        y: 0
    };
    const koopapos = {
        x: 250,
        y: 240 - 56
    };
    //creat class to call draw methods on background layers
    const comp = new Compositor();
    //create buffers for Tiles to draw as backgrounds(this way we can just draw once) -- then every update method we just replace the tiles from buffer like on line 81
    const background = createBackground(level.backgrounds, backgroundSpriteTiles);
    const sprites = createSpriteLayer(marioSprite, pos);
    const koopa = createSpriteLayer(koopaSprite, koopapos);
    //add method to call buffer for draw to comp
    comp.layers.push(background);
    comp.layers.push(sprites);
    comp.layers.push(koopa);
    function update() {
        //draw backgrounds
        comp.draw(context);
        // context.drawImage(backgroundBuffer,0,0);
        // marioSprite.draw('idle',context,pos.x,pos.y);
        // koopaSprite.draw('idle',context,32,240-56);
        pos.x += 1;
        // pos.y += 2;
        koopapos.x -= 1;
        requestAnimationFrame(update);
    }
    update();
});
function loadMarioSprite() {
    return loadImage('./src/img/sprites.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        console.log("image", image);
        sprites.define('idle', 0, 88, 16, 16);
        return sprites;
    });
}
function loadKoopaSprite() {
    return loadImage('./src/img/sprites.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 24);
        console.log("image", image);
        sprites.define('idle', 0, 48, sprites.width, sprites.height);
        return sprites;
    });
}
function loadBackgroundSprites() {
    return loadImage('./src/img/tiles.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        console.log("image", image);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 10, 7);
        sprites.defineTile('brick', 0, 0);
        return sprites;
    });
}
/**
 * Methods to crop subset of image(sprite) from spritesheet and render the selected sprite on to canvas
 */
class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }
    //don't draw from spritesheet everytime
    //lets create a buffer to store the images of each kind crop to specific item we want(brick,sky,water,mario...etc)
    define(name, sx, sy, sWidth, sHeight) {
        const buffer = document.createElement('canvas');
        buffer.width = sWidth;
        buffer.height = sHeight;
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        buffer.getContext('2d').drawImage(this.image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
        //save the new canvas element in a map for fast lookup when drawing the level
        this.tiles.set(name, buffer);
    }
    defineTile(name, sx, sy) {
        this.define(name, sx * this.width, sy * this.width, this.width, this.height);
    }
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
//# sourceMappingURL=mario.js.map