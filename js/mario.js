"use strict";
function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}
async function loadLevel(name) {
    let level = await fetch(`./src/levels/${name}.json`);
    return await level.json();
    // })
}
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
// context?.fillRect(0,0,50,50);
function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}
loadImage('./src/img/tiles.png').then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 10, 7);
    // let level = await loadLevel('1-1');
    // console.log(level);
    loadLevel('1-1').then(level => {
        console.log(level);
        level.backgrounds.forEach(background => {
            drawBackground(background, context, sprites);
        });
    });
    //span the height and width of canvas size defined in index.html (each tile is 16*16) canvas size is 256x240
    // for (let x = 0; x < 16;  ++x){
    //     for (let y = 13; y < 15; ++y){
    //         sprites.drawTile('ground',context,x,y);
    //     }
    // }
    // sprites.draw('ground',context,45,62);
});
class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }
    //don't draw from tiles.png everytime
    //lets create a buffer to store the images of each kind(brick,sky,water...etc)
    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer.getContext('2d').drawImage(this.image, x * this.width, y * this.height, this.width, this.height, 0, 0, this.width, this.height);
        //save the new canvas element in a map for fast lookup when drawing the level
        this.tiles.set(name, buffer);
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