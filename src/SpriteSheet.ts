class SpriteSheet {
    /*
    context.drawImage(image,
        0,0, //location to start on sprite sheet (upper left corner)
        16,16, //area to crop on sprite sheet
        16,16, //location of image on canvas
        16,16);//size of image on canvas (strech or shrink)
    */

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
    //don't draw from tiles.png everytime
    //lets create a buffer to store the images of each kind(brick,sky,water...etc)
    define(name:string,x:number,y:number):void{
        const buffer = document.createElement('canvas') as HTMLCanvasElement;
        buffer.width = this.width
        buffer.height = this.height;
        buffer.getContext('2d').drawImage(this.image,
                                          x * this.width, 
                                          y * this.height, 
                                          this.width,this.height,
                                          0,0,
                                          this.width,this.height);

        //save the new canvas element in a map for fast lookup when drawing the level
        this.tiles.set(name,buffer);
        
    }
    draw(name:string,context:CanvasRenderingContext2D,x:number,y:number):void{
        const buffer:HTMLCanvasElement = this.tiles.get(name);
        context.drawImage(buffer,x,y);
    }
    drawTile(name:string,context:CanvasRenderingContext2D,x:number,y:number):void{
        this.draw(name,context,x * this.width,y * this.height);
    }
}