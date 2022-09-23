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
        mario.addTrait(new Velocity());
        mario.addTrait(new Jump());
        mario.draw = function drawMario(context) {
            // let arr = ['walk-1','walk-2','walk-3'];
            marioSprite.draw('idle', context, this.pos.x, this.pos.y);
        };
        return mario;
    });
}
// const koopa = new Entity();
// koopa.pos.set(250,240-56);
class Trait {
    constructor(name) {
        this.name = name;
    }
    update(_entity, _deltaTime) {
        console.warn("Unhandled update call in trait");
    }
}
//traits are added in entites.ts
class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.velocity = new Vec2(0, 0);
        this.traits = [];
    }
    // abstract update(deltaTime:number):void
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
const PRESSED = 1;
const RELEASED = 0;
class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();
        // Holds the callback functions for a key code 
        this.keyMap = new Map();
    }
    addMapping(key, callback) {
        this.keyMap.set(key, callback);
    }
    handleEvent(event) {
        //key is property of KeyboarEvent
        const { key } = event;
        if (!this.keyMap.has(key)) {
            //Did not have key mapped
            return;
        }
        //if we are here we know we have the key mapped
        //prevent event from happening in browser F5 refresh, pagedown moves pagedown etc...(none of this will now happen)
        event.preventDefault();
        //is keyState up or down
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        if (this.keyStates.get(key) === keyState) {
            return;
        }
        this.keyStates.set(key, keyState);
        //calls call back funciton and gives keyState as arguemtn
        this.keyMap.get(key)(keyState);
    }
    listenTo(window) {
        //add keyup and keydown to window listener
        ['keyup', 'keydown'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                // console.log(event);
                this.handleEvent(event);
            });
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
// function test():void{
//     console.log("testing callback fucntion!!!");
// }
//load level and sprites in parallel -- do not wait for backgroundsprites to finish before starting loadlevel
//but do not continue until all have finished loading
Promise.all([
    loadKoopaSprite(),
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([koopaSprite, mario, backgroundSpriteTiles, level]) => {
    const gravity = 2000;
    mario.pos.set(0, 240 - 48);
    mario.velocity.set(200, -600);
    let input = new KeyboardState();
    input.addMapping("ArrowUp", keyState => {
        if (keyState) {
            mario.jump.start();
        }
        else {
            mario.jump.cancel();
        }
    });
    input.listenTo(window);
    //create class to call draw methods on background layers
    const comp = new Compositor();
    //create buffers for Tiles to draw as full background(this way we can just draw once) -- then every update method we just replace the tiles from buffer
    const background = createBackground(level.backgrounds, backgroundSpriteTiles);
    const sprites = createSpriteLayer(mario);
    //add methods to draw from buffer in  comp
    comp.layers.push(background);
    comp.layers.push(sprites);
    // comp.layers.push(koopa);
    const timer = new Timer(1 / 60); // 1/60 is frame length
    timer.update = function update(deltaTime) {
        // draw backgrounds
        mario.update(deltaTime);
        comp.draw(context);
        // console.log(mario.pos);
        mario.velocity.y += gravity * deltaTime;
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
            //accumlatedTime and delta time to get the same results for macheines with different refresh rate for consistancey with movement and jumps; 
            //Also to control fps different parts of the game if needed 
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
class Velocity extends Trait {
    constructor() {
        super('velocity');
    }
    update(entity, deltaTime) {
        entity.pos.x += entity.velocity.x * deltaTime;
        entity.pos.y += entity.velocity.y * deltaTime;
    }
}
class Jump extends Trait {
    constructor() {
        super('jump');
        //how long we can hold the button
        this.duration = 0.5;
        this.velocity = 200;
        //are we currently jumping
        this.engageTime = 0;
    }
    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
    start() {
        this.engageTime = this.duration;
    }
    cancel() {
        this.engageTime = 0;
    }
}
//# sourceMappingURL=mario.js.map