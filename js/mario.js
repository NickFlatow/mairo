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
        //methods are defined in layers.ts
        //methods are added in main.ts(background and sprites)
        this.layers.forEach(LayerDrawMethod => {
            LayerDrawMethod(context);
        });
    }
}
function createMario() {
    return loadMarioSprite().then(marioSprite => {
        const mario = new Entity();
        mario.draw = function drawMario(context) {
            // let arr = ['walk-1','walk-2','walk-3'];
            marioSprite.draw('idle', context, this.pos.x, this.pos.y);
        };
        mario.update = function update(deltaTime) {
            this.pos.x += this.velocity.x * deltaTime;
            this.pos.y += this.velocity.y * deltaTime;
        };
        return mario;
    });
}
// const koopa = new Entity();
// koopa.pos.set(250,240-56);
class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.velocity = new Vec2(0, 0);
        this.walkCycleIndex = 0;
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
function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
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
//load level and sprites in parallel -- do not wait for backgroundsprites to finish before starting loadlevel
//but do not continue until all have finished loading
Promise.all([
    loadKoopaSprite(),
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([koopaSprite, mario, backgroundSpriteTiles, level]) => {
    const gravity = 30;
    mario.pos.set(0, 240 - 48);
    mario.velocity.set(200, -600);
    //create class to call draw methods on background layers
    const comp = new Compositor();
    //create buffers for Tiles to draw as full background(this way we can just draw once) -- then every update method we just replace the tiles from buffer
    const background = createBackground(level.backgrounds, backgroundSpriteTiles);
    const sprites = createSpriteLayer(mario);
    //add methods to draw from buffer in  comp
    comp.layers.push(background);
    comp.layers.push(sprites);
    // comp.layers.push(koopa);
    const timer = new Timer(1 / 60); //frame length
    timer.update = function update(deltaTime) {
        // draw backgrounds
        comp.draw(context);
        mario.update(deltaTime);
        // console.log(mario.pos);
        mario.velocity.y += gravity;
    };
    timer.start();
});
class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
function loadMarioSprite() {
    return loadImage('./src/img/sprites.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        console.log("image", image);
        sprites.define('idle', 0, 88, 16, 16);
        sprites.define('walk-1', 16, 88, 16, 16);
        sprites.define('walk-2', 32, 88, 16, 16);
        sprites.define('walk-3', 48, 88, 16, 16);
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
class Timer {
    constructor(deltaTime = 1 / 60) {
        // const deltaTime = 1/60;
        let accumulatedTime = 0;
        let lastTime = 0;
        this.updateProxy = (time) => {
            //accumlatedTime and delta time to get the same results for macheines with different refresh rate; Also to control fps different parts of the game if needed
            //and consistancey with movement and jumps
            accumulatedTime += (time - lastTime) / 1000;
            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue();
        };
    }
    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }
    start() {
        this.enqueue();
    }
    update(_deltaTime) { }
    updateProxy(_time) { }
}
//# sourceMappingURL=mario.js.map