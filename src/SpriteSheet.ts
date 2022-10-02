/**
 * Methods to crop subset of image(sprite) from spritesheet and render the selected sprite on to canvas
 */
export class SpriteSheet {
    image:CanvasImageSource;
    width:number;
    height:number;
    tiles:Map<string,HTMLCanvasElement>;
    constructor(image:HTMLImageElement,width:number,height:number){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map<string,HTMLCanvasElement>();
    }
    //don't draw from spritesheet everytime
    //lets create a buffer to store the images of each kind crop to specific item we want(brick,sky,water,mario...etc)
    define(name:string,sx:number,sy:number,sWidth:number,sHeight:number):void{
        const buffer = document.createElement('canvas') as HTMLCanvasElement;
        buffer.width = sWidth
        buffer.height = sHeight;
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        buffer.getContext('2d').drawImage(this.image,
                                          sx, 
                                          sy, 
                                          sWidth,
                                          sHeight,
                                          0,
                                          0,
                                          sWidth,
                                          sHeight);

        //save the new canvas element in a map for fast lookup when drawing the level
        this.tiles.set(name,buffer);
        
    }
    defineTile(name:string,sx:number,sy:number){
        this.define(name,sx * this.width, sy* this.width,this.width,this.height);
    }
    draw(name:string,context:CanvasRenderingContext2D,x:number,y:number):void{
        const buffer:HTMLCanvasElement = this.tiles.get(name);
        context.drawImage(buffer,x,y);
    }
    drawTile(name:string,context:CanvasRenderingContext2D,x:number,y:number):void{
        this.draw(name,context,x * this.width,y * this.height);
    }
}