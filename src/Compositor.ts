/**
 * draws all the layers in the order they are pushed to the layers array
 */
//loops over all backgound layers and draws them
class Compositor {
    layers:{(context:CanvasRenderingContext2D):void}[]
    constructor(){
        this.layers = [];
    }
    draw(context:CanvasRenderingContext2D){
        //draws a layer on a context -- all it does
        //methods are defined in layers.ts
        //methods are added in main.ts(background and sprites)
        this.layers.forEach(LayerDrawMethod => {
            LayerDrawMethod(context)
        })
    }
}