function loadMarioSprite(){
    return loadImage('./src/img/sprites.png').then(image =>{
        const sprites = new SpriteSheet(image,16,16);
        console.log("image",image);
        sprites.define('idle',0,88,16,16);
        return sprites;
    });
}
function loadKoopaSprite(){
    return loadImage('./src/img/sprites.png').then(image =>{
        const sprites = new SpriteSheet(image,16,24);
        console.log("image",image);
        sprites.define('idle',0,48,sprites.width,sprites.height);
        return sprites;
    });
}
function loadBackgroundSprites(){
    return loadImage('./src/img/tiles.png').then(image =>{
        const sprites = new SpriteSheet(image,16,16);
        console.log("image",image);
        sprites.defineTile('ground',0,0);
        sprites.defineTile('sky',10, 7);
        sprites.defineTile('brick',0,0);
        return sprites;
    });
}