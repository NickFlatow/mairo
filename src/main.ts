const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

// context?.fillRect(0,0,50,50);
function drawBackground(background:background,context:CanvasRenderingContext2D,sprites:SpriteSheet){
    background.ranges.forEach(([x1,x2,y1,y2]) => {

        for (let x = x1; x < x2;  ++x){
            for (let y = y1; y < y2; ++y){
                sprites.drawTile(background.tile,context,x,y);
            }
        }

    });
}
loadImage('./src/img/tiles.png').then(image =>{
    const sprites = new SpriteSheet(image,16,16);
    sprites.define('ground',0,0);
    sprites.define('sky',10,7);

    // let level = await loadLevel('1-1');
    // console.log(level);
    loadLevel('1-1').then(level =>{
        console.log(level);
        level.backgrounds.forEach(background => {
            drawBackground(background,context,sprites);
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