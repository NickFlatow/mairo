const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');



 function createSpriteLayer(sprite:SpriteSheet,pos:{x:number,y:number}){
    return function drawSpriteLayer(context:CanvasRenderingContext2D){
        for(let i = 0; i < 500; i++){
            sprite.draw('idle',context,pos.x + i * 16,pos.y);
        }
    }
}

//load level and sprites in parallel -- do not wait for backgroundsprites to finish before starting loadlevel
//but do not continue until all have finished loading
Promise.all([
    loadKoopaSprite(),
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([koopaSprite,marioSprite,backgroundSpriteTiles,level]) => {
    
    const pos = {
        x:-8000,
        y:0
    }
    const koopapos ={
        x:250,
        y:240-56
    }
    //creat class to call draw methods on background layers
    const comp = new Compositor();
    //create buffers for Tiles to draw as backgrounds(this way we can just draw once) -- then every update method we just replace the tiles from buffer like on line 81
    const background = createBackground(level.backgrounds,backgroundSpriteTiles);
    const sprites = createSpriteLayer(marioSprite,pos);
    const koopa = createSpriteLayer(koopaSprite,koopapos);
    //add method to call buffer for draw to comp
    comp.layers.push(background);
    comp.layers.push(sprites);
    comp.layers.push(koopa);
   


    function update(){
        //draw backgrounds
        comp.draw(context);
        // context.drawImage(backgroundBuffer,0,0);
        // marioSprite.draw('idle',context,pos.x,pos.y);
        // koopaSprite.draw('idle',context,32,240-56);
        pos.x += 1;
        // pos.y += 2;
        koopapos.x -=1;
        requestAnimationFrame(update);
    }
    update()
    

});