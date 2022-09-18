declare function loadImage(url: string): Promise<unknown>;
declare function loadLevel(name: string): Promise<any>;
declare const canvas: HTMLCanvasElement;
declare const context: CanvasRenderingContext2D;
declare function drawBackground(background: background, context: CanvasRenderingContext2D, sprites: SpriteSheet): void;
declare class Compositor {
    layers: {
        (context: CanvasRenderingContext2D): void;
    }[];
    constructor();
    draw(context: CanvasRenderingContext2D): void;
}
declare function createBackground(backgrounds: background[], sprites: SpriteSheet): (context: CanvasRenderingContext2D) => void;
declare function loadMarioSprite(): Promise<SpriteSheet>;
declare function loadKoopaSprite(): Promise<SpriteSheet>;
declare function loadBackgroundSprites(): Promise<SpriteSheet>;
/**
 * Methods to crop subset of image(sprite) from spritesheet and render the selected sprite on to canvas
 */
declare class SpriteSheet {
    image: CanvasImageSource;
    width: number;
    height: number;
    tiles: Map<string, HTMLCanvasElement>;
    constructor(image: HTMLImageElement, width: number, height: number);
    define(name: string, sx: number, sy: number, sWidth: number, sHeight: number): void;
    defineTile(name: string, sx: number, sy: number): void;
    draw(name: string, context: CanvasRenderingContext2D, x: number, y: number): void;
    drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number): void;
}
interface background {
    ranges: number[];
    tile: string;
}
