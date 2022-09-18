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
        this.layers.forEach(LayerDrawMethod => {
            LayerDrawMethod(context)
        })
    }
}