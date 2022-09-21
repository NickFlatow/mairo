
const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

//load level and sprites in parallel -- do not wait for backgroundsprites to finish before starting loadlevel
//but do not continue until all have finished loading
Promise.all([
    loadKoopaSprite(),
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([koopaSprite,mario,backgroundSpriteTiles,level]) => {
    
    const gravity = 30;
    mario.pos.set(0,240-48);
    mario.velocity.set(200,-600); 
    //create class to call draw methods on background layers
    const comp = new Compositor();
    
    //create buffers for Tiles to draw as full background(this way we can just draw once) -- then every update method we just replace the tiles from buffer
    const background = createBackground(level.backgrounds,backgroundSpriteTiles);
    const sprites = createSpriteLayer(mario);
    
    //add methods to draw from buffer in  comp
    comp.layers.push(background);
    comp.layers.push(sprites);
    // comp.layers.push(koopa);
   
    const timer = new Timer(1/60); //frame length
    timer.update = function update(deltaTime:number) {           
            // draw backgrounds
            comp.draw(context);
            mario.update(deltaTime);
            // console.log(mario.pos);
            mario.velocity.y += gravity;
    }

    timer.start();
    
});