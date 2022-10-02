/**
 * draws all the layers in the order they are pushed to the layers array
 */
//loops over all backgound layers and draws them
export class Compositor {
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
